import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import axios from 'axios';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import './hoursPopup.css';
import { getEvents } from '../redux/selectors';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
  withCredentials: true,
});

const HoursPopup = ({ event, onClose, cookies }) => {
  const [name, setName] = useState(''); // TODO: Autofill with authenticated user's name
  const [eventTitle, setEventTitle] = useState(event ? event.title : '');
  const [eventLocation, setEventLocation] = useState(event ? event.extendedProps.location : '');
  const [logStart, setLogStart] = useState('');
  const [logEnd, setLogEnd] = useState(null);
  const [totalHours, setTotalHours] = useState(0);
  const [division, setDivision] = useState(event ? event.extendedProps.division.replace(/\s+/g, '-') : 'Select a Division'); // TODO: Fix attribute name
  const [additionalNotes, setNotes] = useState('');
  const [userEvents] = useState(useSelector(getEvents));
  const [selectedEventId, setSelectedEventId] = useState(event ? event.id : null);

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

    try {
      // TODO: Check valid start log and end log time (must be during the event)
      // create log
      const newLog = {
        userId: cookies.cookies.userId,
        eventId: selectedEventId,
        logStart,
        logEnd,
        totalHours,
        additionalNotes,
      };
      // axios call to send to backend
      const addedLog = await instance.post('logs/add', newLog);
      if (addedLog.status === 200 && addedLog.data) {
        // eslint-disable-next-line
        console.log('Log added successfully');
        onClose();
      } else {
        // eslint-disable-next-line
        console.log('Failed to create Log');
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log('Failed to add Log');
      // eslint-disable-next-line
      console.log(error);
    }
  };

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
        <div>Start Time</div>
        <Datetime
          id="s"
          onChange={(e) => setLogStart(e.toString().substring(0, e.toString().length - 8))}
          required
        />
        <br />
        <div>End Time</div>
        <Datetime id="s" onChange={(e) => setLogEnd(e.toString().substring(0, e.toString().length - 8))} required />
        <label htmlFor="hours">
          Total Hours
          <br />
          <input id="hours" type="text" value={totalHours} onChange={(e) => setTotalHours(e.target.value)} required />
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
