import React from 'react';
import { PropTypes } from 'prop-types';
import './eventConfirmationPopup.css';

const EventConfirmationPopup = ({ event, onConfirmClick, onCancelClick }) => {
  // Date formatting
  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(startDate);
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(startDate).toUpperCase();
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(startDate);
  const dayOfWeek = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(startDate).toUpperCase();
  const startTime = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' }).format(startDate);
  const endTime = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' }).format(endDate);

  return (
    <div className="event-modal">
      <div className="event-modal-content">
        <div className="event-modal-header">
          Image
          <div
            className="event-modal-close"
            onClick={onCancelClick}
            onKeyDown={onCancelClick}
            role="button"
            tabIndex={0}
          >
            X
          </div>
        </div>
        <div className="event-modal-body">
          <div className="event-modal-title">
            <h5 className="event-modal-time">{`${dayOfWeek} ${month} ${day} ${year} ${startTime} - ${endTime}`}</h5>
            <h5 className="event-title">{event.title}</h5>
          </div>
          <div className="event-modal-details">
            <h5>Details</h5>
            <p>{event.location}</p>
            <p>{event.division}</p>
            <p>{`0/${event.eventLimit} Spots Remaining`}</p>
          </div>
          <div className="event-modal-description">
            <p>{event.description}</p>
          </div>
          <div className="event-modal-buttons">
            <div
              className="popup-confirm-button"
              onClick={onConfirmClick}
              onKeyDown={onConfirmClick}
              role="button"
              tabIndex={0}
            >
              Confirm
            </div>
            <div
              className="popup-cancel-button"
              onClick={onCancelClick}
              onKeyDown={onCancelClick}
              role="button"
              tabIndex={0}
            >
              Cancel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EventConfirmationPopup.propTypes = {
  event: PropTypes.objectOf(String).isRequired,
  onConfirmClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
};

export default EventConfirmationPopup;
