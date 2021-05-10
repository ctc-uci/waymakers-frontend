import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import '../event-popup/eventPopup.css';

import { connect } from 'react-redux';
import { addEvent } from '../redux/actions';

// import axios from 'axios';
// const instance = axios.create({
//   baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
//   withCredentials: true,
// });

const AddEventPopup = ({ onClose, addNewEvent }) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('Volunteer');
  const [eventLimit, setEventLimit] = useState(0);
  const [division, setDivision] = useState('Crisis-Response-Team');

  // TODO: Import DateTime picker component since datetimelocal not on safari

  // adds event to the database
  const onSubmit = async (e) => {
    e.preventDefault();
    const newEvent = {
      eventName: title,
      eventType,
      eventLocation: location,
      eventDescription: description,
      division: division.replace(/-/g, ' '),
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      eventLimit,
      isAllDay: false, // default to false right now
    };
    console.log(newEvent);
    addNewEvent(newEvent);
    onClose();
  };

  return (
    <div className="popup">
      <h2>Add Event</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">
          Title:
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>

        <br />

        <label htmlFor="event-type">
          Event Type:
          <br />
          <select id="event-type" name="eventType" onChange={(e) => setEventType(e.target.value)}>
            <option value="Volunteer">Volunteer</option>
            <option value="Outreach">Outreach</option>
          </select>
        </label>

        <br />

        <label htmlFor="event-limit">
          Volunteer Limit:
          <br />
          <input id="event-limit" type="number" value={eventLimit} onChange={(e) => setEventLimit(e.target.value)} required />
        </label>

        <label htmlFor="division">
          Division:
          <br />
          <select id="division" name="division" value={division} onChange={(e) => setDivision(e.target.value)}>
            <option value="Crisis-Response-Team">Crisis Response Team</option>
            <option value="Gang-Services">Gang Services</option>
            <option value="Human-Trafficking">Human Trafficking</option>
          </select>
        </label>

        <div>Start Time</div>
        <Datetime
          initialValue={new Date(startTime)}
          id="start-date"
          onChange={(e) => setStartTime(e.toString().substring(0, e.toString().length - 8))}
          required
        />
        <br />
        <div>End Time</div>
        <Datetime
          initialValue={new Date(endTime)}
          id="end-date"
          onChange={(e) => setEndTime(e.toString().substring(0, e.toString().length - 8))}
          required
        />
        <br />
        <label htmlFor="location">
          Location:
          <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </label>
        <br />
        <label htmlFor="details">
          Details:
          <input id="details" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <br />
        <input type="submit" value="Save" />
      </form>
      <button type="button" onClick={onClose}>Cancel</button>
    </div>
  );
};

AddEventPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  addNewEvent: PropTypes.func.isRequired,
};

// export default AddEventPopup;
export default connect(null, {
  addNewEvent: addEvent,
})(AddEventPopup);
