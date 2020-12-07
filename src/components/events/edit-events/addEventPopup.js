import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import '../event-popup/eventPopup.css';

const AddEventPopup = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('Volunteer');

  // adds event to the database
  const onSubmit = async (e) => {
    e.preventDefault();

    const newEvent = {
      eventName: title,
      eventType,
      eventLocation: location,
      eventDescription: description,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      isAllDay: false, // default to false right now
    };

    try {
      const addedEvent = await axios.post('http://localhost:3000/events/add', newEvent);
      if (addedEvent.status === 200 && addedEvent.data) {
        // eslint-disable-next-line
        console.log('Event added successfully');
      } else {
        // eslint-disable-next-line
        console.log('Failed to create event');
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log('Error while trying to add event ' + error);
    }
    // close the popup
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
          <select id="event-type" name="event-type" onChange={(e) => setEventType(e.target.value)}>
            <option value="volunteer">Volunteer</option>
            <option value="outreach">Outreach</option>
          </select>
        </label>
        <br />
        <label htmlFor="start-time">
          Start Time:
          <input id="start-time" type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        </label>
        <br />
        <label htmlFor="end-time">
          End Time:
          <input id="end-time" type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        </label>
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
};

export default AddEventPopup;
