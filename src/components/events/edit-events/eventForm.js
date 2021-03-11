import React, { useState, useEffect } from 'react';
import Datetime from 'react-datetime';
import { useSelector } from 'react-redux';
import {
  setShowPopup,
  addEvent,
  changePopupType,
  editEvent,
} from '../redux/actions';
import { getPopupType, getSelectedEvent } from '../redux/selectors';
import store from '../redux/store';

import './eventForm.css';

// const POPUP_TYPE= Object.freeze({
//     ADD_EVENT,
//     MODIFY_EVENT,
//     EDIT_EVENT
// })

const EventForm = () => {
//   const event = useSelector(getSelectedEvent);

  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('Volunteer');
  const [eventLimit, setEventLimit] = useState(0);
  const [division, setDivision] = useState('Crisis-Response-Team');

  // const [title, setTitle] = useState(event.title);
  // const [startTime, setStartDate] = useState(new Date(event.start));
  // const [endTime, setEndDate] = useState(new Date(event.end));
  // const [location, setLocation] = useState(event.extendedProps.location);
  // const [description, setDescription] = useState(event.extendedProps.description);
  // const [eventType, setEventType] = useState(event.extendedProps.eventType);
  // const [division, setDivision] = useState(event.extendedProps.division.replace(/\s+/g, '-'));
  // const [eventLimit, setEventLimit] = useState(event.extendedProps.eventLimit);
  // data initalize depdning on redux form ttype??
  const event = useSelector(getSelectedEvent);
  const popupType = useSelector(getPopupType);

  useEffect(() => {
    switch (popupType) {
    // View Event Info
      case 'AddEventForm':
        setTitle('');
        setStartTime('');
        setEndTime('');
        setLocation('');
        setDescription('');
        setEventType('');
        setEventLimit('');
        setDivision('');
        break;
      default:
        setTitle(event.title);
        setStartTime(new Date(event.start));
        setEndTime(new Date(event.end));
        setLocation(event.location);
        setDescription(event.description);
        setEventType(event.eventType);
        setDivision(event.division.replace(/\s+/g, '-'));
        setEventLimit(event.eventLimit);
    }
  }, [popupType]);

  const closePopup = () => {
    store.dispatch(setShowPopup(false));
  };

  const CancelButton = () => (
    <button
      className="button cancel-button"
      type="button"
      aria-label="close popup"
      onClick={closePopup}
    >
      Cancel
    </button>
  );

  const onSubmitAddEvent = async (e) => {
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
    store.dispatch(addEvent(newEvent));
    closePopup();
  };

  const onSubmitModifyEvent = async (e) => {
    e.preventDefault();

    const editedEvent = {
      eventId: event.id,
      eventName: title,
      eventType,
      eventLocation: location,
      eventDescription: description,
      division: division.replace(/-/g, ' '),
      eventLimit,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      isAllDay: false, // default to false right now
    };
    store.dispatch(editEvent(event.id, editedEvent));
    closePopup();
  };

  // Render form title
  const FormTitle = () => {
    switch (useSelector(getPopupType)) {
      case 'AddEventForm':
        return (
          <div className="form-title-container">
            <h2>Add Event Information</h2>
          </div>
        );
      case 'ViewEventInfoPopup':
        return (
          <>
            <h2>View Event Information</h2>
            <button type="button" onClick={() => store.dispatch(changePopupType('ModifyEventForm'))}>Edit Button</button>
          </>
        );
      case 'ModifyEventForm':
        return <h2>Edit Event Information </h2>;
      default:
        console.log('No matching Popup Tye');
        return <h2>No type</h2>;
    }
  };

  // Render buttons at the bottom of the Add/Modify/View event form
  const BottomButtons = () => {
    switch (useSelector(getPopupType)) {
      case 'AddEventForm':
        return (
          <>
            <button type="submit" onClick={(e) => onSubmitAddEvent(e)}>Submit</button>
            <br />
            <CancelButton />
          </>
        );
      case 'ViewEventInfoPopup':
        return CancelButton();
      case 'ModifyEventForm':
        return (
          <>
            <button type="submit" onClick={(e) => onSubmitModifyEvent(e)}>Save</button>
            <button type="submit" onClick={() => {}}>Duplicate</button>
            <button type="submit" onClick={onSubmitAddEvent}>Delete</button>
          </>
        );
      default:
        console.log('No matching Popup Tye');
        return CancelButton();
    }
  };

  return (
    <div className="popup">
      <FormTitle />
      <form onSubmit={closePopup}>
        <label htmlFor="title">
          Title:
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} disabled={popupType === 'ViewEventInfoPopup'} required />
        </label>

        <br />

        <label htmlFor="event-type">
          Event Type:
          <br />
          <select id="event-type" name="eventType" value={eventType} onChange={(e) => setEventType(e.target.value)} disabled={popupType === 'ViewEventInfoPopup'}>
            <option value="Volunteer">Volunteer</option>
            <option value="Outreach">Outreach</option>
          </select>
        </label>

        <br />

        <label htmlFor="event-limit">
          Limit:
          <br />
          <input id="event-limit" type="number" value={eventLimit} onChange={(e) => setEventLimit(e.target.value)} disabled={popupType === 'ViewEventInfoPopup'} required />
        </label>

        <label htmlFor="division">
          Division:
          <br />
          <select id="division" name="division" value={division} onChange={(e) => setDivision(e.target.value)} disabled={popupType === 'ViewEventInfoPopup'}>
            <option value="Crisis-Response-Team">Crisis Response Team</option>
            <option value="Gang-Services">Gang Services</option>
            <option value="Human-Trafficking">Human Trafficking</option>
          </select>
        </label>

        <div>Start Time</div>
        <Datetime
          value={new Date(startTime)}
          id="start-date"
          onChange={(e) => setStartTime(e.toString().substring(0, e.toString().length - 8))}
          inputProps={{ disabled: popupType === 'ViewEventInfoPopup' }}
          required
        />
        <br />
        <div>End Time</div>
        <Datetime
          value={new Date(endTime)}
          id="end-date"
          onChange={(e) => setEndTime(e.toString().substring(0, e.toString().length - 8))}
          inputProps={{ disabled: popupType === 'ViewEventInfoPopup' }}
          required
        />
        <br />
        <label htmlFor="location">
          Location:
          <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} disabled={popupType === 'ViewEventInfoPopup'} required />
        </label>
        <br />
        <label htmlFor="details">
          Details:
          <input id="details" type="text" value={description} onChange={(e) => setDescription(e.target.value)} disabled={popupType === 'ViewEventInfoPopup'} required />
        </label>
        <br />
        <BottomButtons />
      </form>
    </div>
  );
};

export default EventForm;
