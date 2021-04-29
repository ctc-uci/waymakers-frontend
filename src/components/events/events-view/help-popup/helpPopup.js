import React from 'react';
import Modal from 'react-modal';
import { PropTypes } from 'prop-types';

import './helpPopup.css';

const HelpPopup = ({ isModalOpen, setIsModalOpen, isAdmin }) => (
  <Modal
    isOpen={isModalOpen}
    onRequestClose={() => setIsModalOpen(false)}
    overlayClassName="delete-account-modal-overlay"
    className="modal"
  >
    <div className="help-popup-container">
      <div className="button-container">
        <button type="button" className="help-popup-close-button" onClick={() => setIsModalOpen(false)}>X</button>
      </div>
      <div className="body">
        <p className="title bold">How it works:</p>
        {isAdmin
          ? (
            <>
              <p>
                Click on an event block to view, edit, copy or delete the event.
              </p>
              <p>
                Use the view dropdown to switch between month, week, and day view on the calendar.
              </p>
              <p>
                Use the date dropdowns to filter by month, day, or year.
              </p>
            </>
          )
          : (
            <>
              <p>
                Click on blue event blocks to add an event.
                Click on green event blocks to remove it or to log hours if the event has past.
              </p>
              <p>
                Use the view dropdown to switch between month, week, and day view on the calendar.
              </p>
              <p>
                Use the date dropdowns to filter by month, day, or year.
              </p>
            </>
          )}
      </div>
    </div>
  </Modal>
);

HelpPopup.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default HelpPopup;
