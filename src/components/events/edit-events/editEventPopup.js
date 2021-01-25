import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

import '../event-popup/eventPopup.css';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
  withCredentials: true,
});

const EditEventPopup = ({ event, onClose }) => {
  const [title, setTitle] = useState(event.title);
  const [startTime, setStartDate] = useState(event.startTime);
  const [endTime, setEndDate] = useState(event.endTime);
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
    try {
      const updatedEvent = await instance.put(`events/${event.id}`, editedEvent);
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

        {/* Cannot use label for Datetime component */}
        <div>Start Time:</div>
        <Datetime
          initialValue={new Date(event.startTime)}
          id="start-date"
          onChange={(e) => setStartDate(e.toString().substring(0, e.toString().length - 8))}
          required
        />
        <br />

        <div>End Time:</div>
        <Datetime
          initialValue={new Date(event.endTime)}
          id="end-date"
          onChange={(e) => setEndDate(e.toString().substring(0, e.toString().length - 8))}
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

EditEventPopup.propTypes = {
  event: PropTypes.objectOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditEventPopup;
