import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import { connect } from 'react-redux';

import 'react-datetime/css/react-datetime.css';

import '../event-popup/eventPopup.css';

import { editEvent } from '../redux/actions';

// Configured to use the FullCalendar EventAPI object fields only
// Might want to write a function to convert back and forth for consistency
const EditEventPopup = ({ event, onClose, updateEvent }) => {
  const [title, setTitle] = useState(event.title);
  const [startTime, setStartDate] = useState(new Date(event.start));
  const [endTime, setEndDate] = useState(new Date(event.end));
  const [location, setLocation] = useState(event.extendedProps.location);
  const [description, setDescription] = useState(event.extendedProps.description);
  const [eventType, setEventType] = useState(event.extendedProps.eventType);
  const [division, setDivision] = useState(event.extendedProps.division.replace(/\s+/g, '-'));

  const onSubmit = async (e) => {
    e.preventDefault();

    const editedEvent = {
      eventId: event.id,
      eventName: title,
      eventType,
      eventLocation: location,
      eventDescription: description,
      division: division.replace(/-/g, ' '),
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      isAllDay: false, // default to false right now
    };

    updateEvent(event.id, editedEvent);
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
          <br />
          <select id="event-type" name="event-type" value={eventType} onChange={(e) => setEventType(e.target.value)}>
            <option value="Volunteer">Volunteer</option>
            <option value="Outreach">Outreach</option>
          </select>
        </label>
        <br />

        <label htmlFor="division">
          Division:
          <br />
          <select id="division" name="division" value={division} onChange={(e) => setDivision(e.target.value)}>
            <option value="Crisis-Response-Team">Crisis Response Team</option>
            <option value="Gang-Services">Gang Services</option>
            <option value="Human-Trafficking">Human Trafficking</option>
          </select>
        </label>

        {/* Cannot use label for Datetime component */}
        <div>Start Time:</div>
        <Datetime
          initialValue={startTime}
          id="start-date"
          onChange={(e) => setStartDate(e.toString().substring(0, e.toString().length - 8))}
          required
        />
        <br />

        <div>End Time:</div>
        <Datetime
          initialValue={endTime}
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
  event: PropTypes.objectOf(PropTypes.any).isRequired,
  onClose: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
};

export default connect(null, {
  updateEvent: editEvent,
})(EditEventPopup);
