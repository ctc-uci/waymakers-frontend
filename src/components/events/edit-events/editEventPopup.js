import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import '../event-popup/eventPopup.css';

const EditEventPopup = ({ event, onClose }) => {
  const [title, setTitle] = useState(event.title);
  const [startTime, setStartDate] = useState(event.startTime.substring(0, 16).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  const [endTime, setEndDate] = useState(event.endTime.substring(0, 16).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  const [location, setLocation] = useState(event.location);
  const [description, setDescription] = useState(event.description);
  const [eventType, setEventType] = useState(event.eventType);

  const onSubmit = async (e) => {
    e.preventDefault();

    const editedEvent = {
      eventName: title,
      eventType,
      eventLocation: location,
      eventDescription: description,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      isAllDay: false, // default to false right now
    };
    console.log(1);
    try {
      const updatedEvent = await axios.put(`http://localhost:3000/events/${event.id}`, editedEvent);
      console.log(2);
      if (updatedEvent.status === 200 && updatedEvent.data) {
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
    console.log(3);
    onClose();
  };

  return (
    <div className="popup">
      <h2>Edit Event</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">
          Title:
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <br />
        <label htmlFor="event-type">
          Event Type:
          <select id="event-type" name="event-type" value={eventType} onChange={(e) => setEventType(e.target.value)}>
            <option value="volunteer">Volunteer</option>
            <option value="outreach">Outreach</option>
          </select>
        </label>
        <br />
        <label htmlFor="start-date">
          Start Time:
          <input id="start-date" type="datetime-local" value={startTime} onChange={(e) => setStartDate(e.target.value)} required />
        </label>
        <br />
        <label htmlFor="end-date">
          End Time:
          <input id="end-date" type="datetime-local" value={endTime} onChange={(e) => setEndDate(e.target.value)} required />
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

EditEventPopup.propTypes = {
  event: PropTypes.objectOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditEventPopup;
