import React from 'react';
import { PropTypes } from 'prop-types';
import './eventConfirmationPopup.css';

const EventConfirmationPopup = ({
  event, onConfirmClick, onCancelClick,
}) => {
  // Date formatting
  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(startDate);
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(startDate).toUpperCase();
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(startDate);
  const dayOfWeek = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(startDate).toUpperCase();
  const startTime = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' }).format(startDate);
  const endTime = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' }).format(endDate);
  const eventType = `${event.eventType.toLowerCase()}-event`;

  return (
    <div className="event-modal">
      <div className="event-modal-content">
        <div className={`popup-${eventType}-header`}>
          <div
            className="event-modal-close"
            onClick={onCancelClick}
            onKeyDown={onCancelClick}
            role="button"
            tabIndex={0}
          >
            x
          </div>
        </div>
        <div className="event-modal-body">
          <div className="event-modal-title">
            <h5 className="event-modal-time">{`${dayOfWeek} ${month} ${day} ${year} ${startTime} - ${endTime}`}</h5>
            <h5 className="event-title">{event.title}</h5>
          </div>
          <div className="event-modal-details">
            <h5 className="popup-details-text">Details</h5>
            <p className="popup-details-text">{event.location}</p>
            <p className="popup-details-text">{event.division}</p>
            <p className="popup-details-text">{`0/${event.eventLimit} Spots Remaining`}</p>
          </div>
          <div className="event-modal-description">
            <p>{event.description}</p>
          </div>
          {event.listType === 'more-events' ? (
            <div className="popup-confirm-buttons-container">
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
          )
            : (
              <div>
                <div
                  className="popup-remove-button"
                  onClick={onConfirmClick}
                  onKeyDown={onConfirmClick}
                  role="button"
                  tabIndex={0}
                >
                  Remove From My Events
                </div>
              </div>
            )}
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
