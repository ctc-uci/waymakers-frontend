import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './hoursPopup.css';

const HoursPopup = ({ event, onClose }) => {
  console.log(event);
  const [name, setName] = useState(''); // TODO: Autofill with authenticated user's name
  const [eventTitle, setEventTitle] = useState(event ? event.title : '');
  const [eventLocation, setEventLocation] = useState(event ? event.extendedProps.location : '');
  const [logStart, setLogStart] = useState(null);
  const [logEnd, setLogEnd] = useState(null);
  const [totalHours, setTotalHours] = useState(0);
  const [division, setDivision] = useState('Select a Division'); // TODO: Autofill division, and set readonly later!
  const [additionalNotes, setNotes] = useState('');

  // TODO: useEffect call to grab events to choose from in dropdown IF no event prop passed in
  // And should autofill with event details whenever dropdown option is changed!
  // might need to keep state for the event id (when grabbed from the backend)
  // prob need variable list to store all event objects grabbed from backend so we can switch
  // between them

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('HELLO');
      // TODO: Check valid start log and end log time (must be during the event)

      // create log
      const newLog = {
        userId: '9dzJHRJKWTe6xMt304uvpzoohEX2',
        eventId: '1',
        /* TODO:  Get id from event prop or selected event (need to conditionally
          render dropdown and set value
          to the event id of each event */
        name,
        eventTitle,
        eventLocation,
        logStart,
        logEnd,
        totalHours,
        division,
        additionalNotes,
      };

      // axios call to send to backend
      console.log('about to send request');
      const addedLog = await axios.post('http://localhost:3000/events/loghours', newLog);
      console.log(addedLog);
      if (addedLog.status === 200 && addedLog.data) {
        // eslint-disable-next-line
        console.log('Log added successfully');
      } else {
        // eslint-disable-next-line
        console.log('Failed to create Log');
      }
    } catch (error) {
      console.log('Failed to add Log');
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
        <label htmlFor="title">
          Title of Event
          <br />
          <input id="title" type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} required readOnly={event} />
        </label>
        <label htmlFor="location">
          Location
          <br />
          <input id="location" type="text" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} required readOnly={event} />
        </label>
        <label htmlFor="start">
          Start Time
          <input id="start" type="datetime-local" value={logStart} onChange={(e) => setLogStart(e.target.value)} required />
        </label>
        <br />
        <label htmlFor="end">
          End Time
          <input id="end" type="datetime-local" value={logEnd} onChange={(e) => setLogEnd(e.target.value)} required />
        </label>
        <label htmlFor="hours">
          Total Hours
          <br />
          <input id="hours" type="text" value={totalHours} onChange={(e) => setTotalHours(e.target.value)} required />
        </label>
        {/* TODO: CONDITIONALLY RENDER DIVISIONS FROM DATABASE, IN CASE THEY ADD MORE */}
        <label htmlFor="division">
          Division
          <br />
          <select id="division" name="division" value={division} onChange={(e) => setDivision(e.target.value)}>
            <option value="crisis-response-team">Crisis Response Team</option>
            <option value="gang-services">Gang Services</option>
            <option value="human-trafficking">Human Trafficking</option>
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
};

HoursPopup.defaultProps = {
  event: null,
};

export default HoursPopup;
