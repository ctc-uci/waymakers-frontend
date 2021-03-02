import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import axios from 'axios';
import './hoursPopup.css';
import moment from 'moment';
import { getEvents } from '../redux/selectors';
import EventLog from './event-log/eventLog';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
  withCredentials: true,
});

const HoursPopup = ({ event, onClose, cookies }) => {
  const [name, setName] = useState(''); // TODO: Autofill with authenticated user's name
  const [eventTitle, setEventTitle] = useState(event ? event.title : '');
  const [eventLocation, setEventLocation] = useState(event ? event.extendedProps.location : '');
  const [logShifts, setLogShifts] = useState([{
    logStart: '',
    logEnd: '',
  }]);
  const [totalHours, setTotalHours] = useState(0);
  const [division, setDivision] = useState(event ? event.extendedProps.division.replace(/\s+/g, '-') : 'Select a Division'); // TODO: Fix attribute name
  const [additionalNotes, setNotes] = useState('');
  const [userEvents] = useState(useSelector(getEvents));
  const [selectedEventId, setSelectedEventId] = useState(event ? event.id : null);

  const changeTotalHours = () => {
    const hours = logShifts.map((l) => ((!(l.logStart === '' || l.logEnd === '') && (l.logEnd >= l.logStart)) ? moment.duration(l.logEnd.diff(l.logStart)).asHours() : 0));
    const totalCalculatedHours = hours.reduce((acc, v) => acc + v);
    setTotalHours(totalCalculatedHours);
  };

  // TODO: useEffect call to grab events to choose from in dropdown IF no event prop passed in
  // And should autofill with event details whenever dropdown option is changed!
  // might need to keep state for the event id (when grabbed from the backend)
  // prob need variable list to store all event objects grabbed from backend so we can switch
  // between them
  const onEventChange = (e) => {
    const title = e.target.value;
    userEvents.forEach((userEvent) => {
      if (userEvent.title === title) {
        setEventTitle(userEvent.title);
        setEventLocation(userEvent.location);
        setDivision(userEvent.division.replace(/\s+/g, '-'));
        setSelectedEventId(userEvent.id);
      }
    });
  };

  // TODO: A potential issue is rendering recurring events for the dropdown
  //       Won't be able to tell diffference between events with same TITLE

  const renderEvents = () => {
    if (event === null) {
      // generate option tags for each event in redux store
      const allEvents = useSelector(getEvents);
      const getOptions = (events) => events.map((e) => <option id="events-dropdown" value={e.title}>{e.title}</option>);

      return (
        <label htmlFor="title">
          Title of Event
          <br />
          <select id="title" value={eventTitle} onChange={onEventChange} required>
            {getOptions(allEvents)}
          </select>
        </label>
      );
    }

    return (
      <label htmlFor="title">
        Title of Event
        <br />
        <input id="title" type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} required readOnly={event} />
      </label>
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let validShifts = true;
    // checking if end log is before start log
    logShifts.forEach((log, index) => {
      if (log.logStart >= log.logEnd) {
        console.log(`Invalid shift times for shift: ${logShifts[index].logStart} to ${logShifts[index].logEnd}, index ${index}!`);
        validShifts = false;
      }
    });

    if (validShifts) {
      try {
        const hours = logShifts.map((l) => (moment.duration(l.logEnd.diff(l.logStart)).asHours()));
        const addLogPromises = [];
        logShifts.forEach((log, index) => {
          const newLog = {
            userId: cookies.cookies.userId,
            eventId: selectedEventId,
            logStart: log.logStart,
            logEnd: log.logEnd,
            totalHours: hours[index],
            additionalNotes,
          };
          addLogPromises.push(instance.post('logs/add', newLog));
        });
        // axios call to send to backend
        await Promise.all(addLogPromises)
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            console.log('All shifts added successfully!');
            onClose();
          });
      } catch (error) {
        // eslint-disable-next-line
        console.log('Failed to add Log');
        // eslint-disable-next-line
        console.log(error);
      }
    }
  };

  const logChange = (logIndex, startLog, value) => {
    const newLogShifts = [...logShifts];
    if (startLog) {
      newLogShifts[logIndex].logStart = value;
    } else {
      newLogShifts[logIndex].logEnd = value;
    }
    changeTotalHours();
    setLogShifts(newLogShifts);
  };

  const addShift = () => {
    setLogShifts([...logShifts, { logStart: '', logEnd: '' }]);
  };

  const removeShift = () => {
    if (logShifts.length !== 1) {
      setLogShifts(logShifts.slice(0, logShifts.length - 1));
    }
  };

  // Update total hours when a shift is removed
  useEffect(() => {
    changeTotalHours();
  }, [logShifts]);

  return (
    <div id="hours-popup" className="popup">
      <h3>Event Information</h3>
      <hr />
      <form>
        <label htmlFor="name">
          Name
          <br />
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        {renderEvents()}
        <label htmlFor="location">
          Location
          <br />
          <input id="location" type="text" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} readOnly />
        </label>
        {logShifts.map((log, idx) => (
          <EventLog
            index={idx}
            logChange={logChange}
          />
        ))}
        <button type="button" onClick={removeShift}>-</button>
        <button type="button" onClick={addShift}>+</button>
        <br />
        <label htmlFor="hours">
          Total Hours
          <br />
          <input tabIndex="-1" id="hours" type="text" value={totalHours} required />
        </label>
        <label htmlFor="division">
          Division
          <br />
          <select id="division" name="division" value={division} onChange={(e) => setDivision(e.target.value)} readOnly>
            <option value="Crisis-Response-Team">Crisis Response Team</option>
            <option value="Gang-Services">Gang Services</option>
            <option value="Human-Trafficking">Human Trafficking</option>
          </select>
        </label>
        <label htmlFor="notes">
          Additional Notes (Optional)
          <br />
          <input id="notes" type="text" value={additionalNotes} onChange={(e) => setNotes(e.target.value)} />
        </label>
      </form>
      <button type="button" aria-label="close popup" onClick={onClose}>Close</button>
      <button type="button" aria-label="submit" onClick={onSubmit}>Submit</button>
    </div>
  );
};
HoursPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  event: PropTypes.objectOf(PropTypes.string),
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

HoursPopup.defaultProps = {
  event: null,
};

export default withCookies(HoursPopup);
