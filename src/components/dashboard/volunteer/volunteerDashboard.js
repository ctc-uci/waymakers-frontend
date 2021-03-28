import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card, Button, Alert,
} from 'react-bootstrap';
import {
  startOfWeek, add, getHours, getDay,
} from 'date-fns';
import axios from 'axios';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import disableScroll from 'disable-scroll';
import EventConfirmationPopup from '../../events/event-confirmation-popup/eventConfirmationPopup';
import auth from '../../firebase/firebase';
import EventList from '../../events/event-list/eventList';
import './volunteerDashboard.css';
import ViewAvailability from '../availability-component/viewAvailability/viewAvailability';
import EditAvailability from '../availability-component/editAvailability/editAvailability';
import HelpPopup from '../availability-component/help-popup/helpPopup';

const VolunteerDashboard = (props) => {
  const instance = axios.create({
    baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
    withCredentials: true,
  });

  const { cookies } = props;
  const [moreEvents, setMoreEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [allAvailability, setAllAvailability] = useState([]);
  const [freqMap, setfreqMap] = useState(new Map());
  const [availabilityMode, setAvailabilityMode] = useState('view');
  const history = useHistory();
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [currEvent, setCurrEvent] = useState({});
  const [confirmPopupSeen, setConfirmPopupSeen] = useState(false);
  const [helpPopupSeen, setHelpPopupSeen] = useState(false);

  const startWeek = startOfWeek(new Date());

  const NUM_EVENTS_DISPLAYED = 5;

  async function logout() {
    try {
      await auth.signOut();
      history.push('/login');
      // Removing session cookie
      cookies.remove('accessToken');
      cookies.remove('userId');
      // Sign-out successful
    } catch (err) {
      setError(err.message);
    }
  }

  async function getEvents() {
    try {
      // Gets events user is signed up for as well as all waymakers events
      const userID = cookies.get('userId');
      let allEvents = await instance.get('events');
      let userEvents = await instance.get(`userEvent/${userID}`);

      const filteredAllEvents = [];
      allEvents = allEvents.data;
      userEvents = userEvents.data;
      const userEventIDSet = new Set(userEvents.map((event) => event.id));

      // Removes the events the user is signed up for from the list of all events. Only render
      // NUM_EVENTS_DISPLAYED number of events for both 'More Events' list and 'My Events' list
      let i = 0;
      while (filteredAllEvents.length < NUM_EVENTS_DISPLAYED && i < allEvents.length) {
        if (!userEventIDSet.has(allEvents[i].id)) {
          filteredAllEvents.push(allEvents[i]);
        }
        i += 1;
      }

      setMoreEvents(filteredAllEvents);
      setMyEvents(userEvents.slice(0, NUM_EVENTS_DISPLAYED));
    } catch (e) {
      // eslint-disable-next-line
      console.log('Error while getting events from the backend!');
    }
  }

  const stringToDate = (dateString) => {
    const {
      dayofweek, starttime,
    } = dateString;

    const splitTime = String(starttime).split(':');
    const date = add(startWeek, {
      years: 0,
      months: 0,
      weeks: 0,
      days: dayofweek,
      hours: splitTime[0],
      minutes: 0,
      seconds: 0,
    });

    return date;
  };

  const parseDate = (date) => {
    const hours = getHours(date);
    return [getDay(date), `${hours}:00:00`];
  };

  const getAvailability = async () => {
    try {
      const userID = cookies.get('userId');

      const availabilityResult = await axios.get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/availability/${userID}`, {
          withCredentials: true,
        },
      );

      const allAvailabilityResult = await axios.get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/availability/all`, {
          withCredentials: true,
        },
      );

      // handling one user's availability
      const { userAvailability } = availabilityResult.data;
      // console.log('userAvailability', userAvailability);
      const dateList = userAvailability.map((dateString) => (stringToDate(dateString)));
      setAvailability(dateList);

      // handling all users' availability
      let { usersAvailability } = allAvailabilityResult.data;

      const frequencyMap = new Map();

      usersAvailability = usersAvailability.map((dateString) => {
        const {
          dayofweek, starttime, count,
        } = dateString;

        const parsedDate = stringToDate({ dayofweek, starttime });
        frequencyMap.set(JSON.stringify(parsedDate), Number(count));

        return {
          date: parsedDate,
          freq: Number(count),
        };
      });
      setAllAvailability(usersAvailability);
      console.log('frequencyMap', frequencyMap);
      setfreqMap(frequencyMap);
      // console.log('usersAvailability', usersAvailability);
    } catch (e) {
      // eslint-disable-next-line
      console.log('Error while getting availability from the backend!');
    }
  };

  const updateAvailability = async () => {
    const dateList = availability.map((date) => (parseDate(date)));
    const seen = new Set();

    const filteredDates = dateList.filter((date) => {
      const duplicate = seen.has(date.toString());
      seen.add(date.toString());
      return !duplicate;
    });

    const userID = cookies.get('userId');

    await axios.post(
      `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/availability/${userID}`, {
        dates: filteredDates,
      }, {
        withCredentials: true,
      },
    );

    setAvailabilityMode('view');
  }

  function renderAvailability() {
    // console.log(availabilityViewMode);
    // console.log(`rendering availability in ${availabilityMode} mode`);
    // console.log('availability:', availability);

    console.log('allAvailability', allAvailability);
    console.log('freqMap state', freqMap);
    return (
      <div>
        {availabilityMode === 'view' ? (
          <div className="availability-wrapper">
            <h5 className="availability-title">Availability for the Week</h5>
            <div className="availability-buttons-container">
              <div
                className="edit-button"
                onClick={() => { setAvailabilityMode('edit'); }}
                onKeyDown={() => { setAvailabilityMode('edit'); }}
                role="button"
                tabIndex={0}
              >
                Change Availability
              </div>
              <div className="help-popup">?</div>
            </div>
            <ViewAvailability availabilities={availability} startWeek={startWeek} />
            {/* <ViewAvailability
              availabilities={availability}
              startWeek={startWeek}
              showAdmin
              allAvailability={allAvailability}
              freqMap={freqMap}
              maxFreq={Math.max(...allAvailability.map((el) => el.freq), 0)}
            /> */}
          </div>
        )
          : (
            <div className="availability-wrapper">
              <h5 className="availability-title">Availability for the Week</h5>
              <div
                className="save-button"
                onClick={updateAvailability}
                onKeyDown={updateAvailability}
                role="button"
                tabIndex={0}
              >
                Save Changes
              </div>
              <EditAvailability
                availabilityTimes={availability}
                setAvailabilityTimes={setAvailability}
                startWeek={startWeek}
              />
            </div>
          )}
      </div>
    );
  }

  useEffect(async () => {
    setLoading(true);
    getEvents();
    getAvailability();
    setLoading(false);
  }, []);

  // eslint-disable-next-line no-unused-vars
  const moveEvent = (eventType, index) => {
    // If user clicks on event from More Events section to add to My Events section
    if (eventType === 'more-events') {
      // Pop element from moreEvents array and update its state
      const tempMoreEventsArr = [...moreEvents];
      const [poppedEvent] = tempMoreEventsArr.splice(index, 1);
      setMoreEvents(tempMoreEventsArr);

      // Push element that was popped from moreEvents array to myEvents array and update its state
      const tempMyEventsArr = [...myEvents];
      tempMyEventsArr.push(poppedEvent);
      setMyEvents(tempMyEventsArr);
    } else {
      // Pop element from myEvents array and update its state
      const tempMyEventsArr = [...myEvents];
      const [poppedEvent] = tempMyEventsArr.splice(index, 1);
      setMyEvents(tempMyEventsArr);

      // Push element that was popped from myEvents array to moreEvents array and update its state
      const tempMoreEventsArr = [...moreEvents];
      tempMoreEventsArr.push(poppedEvent);
      setMoreEvents(tempMoreEventsArr);
    }
  };

  // Helper function that toggles the confirm popup
  const toggleConfirmPopup = () => {
    if (confirmPopupSeen) {
      disableScroll.off();
    } else {
      disableScroll.on();
    }
    setConfirmPopupSeen(!confirmPopupSeen);
  };

  // This needs to take note of which event was pressed so it can be rendered for the popup
  const onEventButtonClick = (event) => {
    toggleConfirmPopup();
    setCurrEvent(event);
  };

  const onConfirmClick = () => {
    toggleConfirmPopup();
    moveEvent(currEvent.listType, currEvent.index);
  };

  const onHelpButtonClick = () => {
    if (helpPopupSeen) {
      disableScroll.off();
    } else {
      disableScroll.on();
    }
    setHelpPopupSeen(!helpPopupSeen);
  };

  const renderAvailability = () => (
    <div>
      {availabilityMode === 'view' ? (
        <div className="availability-wrapper">
          <h5 className="availability-title">Availability for the Week</h5>
          <div className="availability-buttons-container">
            <div
              className="edit-button"
              onClick={() => { setAvailabilityMode('edit'); }}
              onKeyDown={() => { setAvailabilityMode('edit'); }}
              role="button"
              tabIndex={0}
            >
              Change Availability
            </div>
            <div
              className="help-popup"
              onClick={onHelpButtonClick}
              onKeyDown={onHelpButtonClick}
              role="button"
              tabIndex={0}
            >
              ?
            </div>
          </div>
          <ViewAvailability availabilities={availability} startWeek={startWeek} />
        </div>
      )
        : (
          <div className="availability-wrapper">
            <h5 className="availability-title">Availability for the Week</h5>
            <div
              className="save-button"
              onClick={updateAvailability}
              onKeyDown={updateAvailability}
              role="button"
              tabIndex={0}
            >
              Save Changes
            </div>
            <EditAvailability
              availabilityTimes={availability}
              setAvailabilityTimes={setAvailability}
              startWeek={startWeek}
            />
          </div>
        )}
    </div>
  );

  useEffect(async () => {
    setLoading(true);
    getEvents();
    getAvailability();
    setLoading(false);
  }, []);

  if (isLoading) {
    return (<div>Loading dashboard...</div>);
  }

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="w-100 login-container">
          <Card className="w-100">
            <Card.Body>
              <h2 className="text-center mb-4">Volunteer Dashboard</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Button onClick={logout} to="/login" className="w-100" type="submit" variant="primary">Log Out</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="my-stats-section">
        <h5 className="my-stats-title">My Stats</h5>
        <div className="filler" />
      </div>
      <div className="events-section">
        <div className="event-list-component">
          <EventList events={moreEvents} title="More Events" listType="more-events" onEventButtonClick={onEventButtonClick} />
        </div>
        {confirmPopupSeen
        && (
        <EventConfirmationPopup
          event={currEvent}
          onConfirmClick={onConfirmClick}
          onCancelClick={toggleConfirmPopup}
        />
        )}
        <div className="event-list-component">
          <EventList events={myEvents} title="My Events" listType="my-events" onEventButtonClick={onEventButtonClick} />
        </div>
      </div>
      <div className="key-section">
        <p className="key-text">Key</p>
        <div className="volunteer-event-square" />
        <p className="volunteer-event-text">Volunteer Event</p>
        <div className="outreach-event-square" />
        <p className="outreach-event-text">Outreach Event</p>
        <div className="other-event-square" />
        <p className="other-event-text">Other Event</p>
      </div>
      <div className="availability-section">
        {renderAvailability()}
        {helpPopupSeen && <HelpPopup onHelpButtonClick={onHelpButtonClick} />}
      </div>
    </div>
  );
};

VolunteerDashboard.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(VolunteerDashboard);
