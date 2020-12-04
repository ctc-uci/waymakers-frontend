import React, { useState } from 'react';
import PropTypes from 'prop-types';

import '../event-popup/eventPopup.css';

const EditEventPopup = ({ event, onClose }) => {
  const [title, setTitle] = useState(event.title);
  const [startDate, setStartDate] = useState(event.startDate);
  const [endDate, setEndDate] = useState(event.endDate);
  const [location, setLocation] = useState(event.location);
  const [description, setDescription] = useState(event.description);
  const [eventType, setEventType] = useState(event.eventType);

  const onSubmit = (e) => {
    // the axios call to the backend will go here!!
    // make sure that the event object passed through has an id property
    // close the popup
    e.preventDefault();
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
          Start Date:
          <input id="start-date" type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </label>
        <br />
        <label htmlFor="end-date">
          End Date:
          <input id="end-date" type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
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
