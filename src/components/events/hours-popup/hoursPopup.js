import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './hoursPopup.css';

const HoursPopup = ({ event, onClose }) => {
  console.log(event);
  const [name, setName] = useState(''); // TODO: Autofill with authenticated user's name
  const [eventTitle, setEventTitle] = useState(event ? event.title : '');
  const [location, setLocation] = useState(event ? event.extendedProps.location : '');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [totalHours, setTotalHours] = useState(0);
  const [division, setDivision] = useState('Select a Division'); // TODO: Autofill division, and set readonly later!
  const [notes, setNotes] = useState('');

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
          <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} required readOnly={event} />
        </label>
        <label htmlFor="start">
          Start Time
          <input id="start" type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        </label>
        <br />
        <label htmlFor="end">
          End Time
          <input id="end" type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
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
          <input id="notes" type="text" value={notes} onChange={(e) => setNotes(e.target.value)} required />
        </label>
      </form>
      <button type="button" aria-label="close popup" onClick={onClose}>Close</button>
      <button type="button" aria-label="submit" onClick={onClose}>Submit</button>
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
