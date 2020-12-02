import React, { useState } from 'react';
import PropTypes from 'prop-types';

import '../event-popup/eventPopup.css';

const AddEventPopup = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  // adds event to the database
  const onSubmit = () => {
    // the axios call to the backend will go here!!
    // make sure that the event object passed through has an id property
    // close the popup
    onClose();
  };

  return (
    <div className="popup">
      <h2>Add Event</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">
          Title:
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label htmlFor="start-date">
          Start Date:
          <input id="start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <br />
        <label htmlFor="end-date">
          End Date:
          <input id="end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <br />
        <label htmlFor="location">
          Location:
          <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <br />
        <label htmlFor="details">
          Details:
          <input id="details" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
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
