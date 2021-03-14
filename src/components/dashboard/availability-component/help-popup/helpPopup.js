import React from 'react';
import { PropTypes } from 'prop-types';
import './helpPopup.css';

const HelpPopup = ({ onHelpButtonClick }) => (
  <div className="volunteer-help-modal">
    <div className="volunteer-help-modal-content">
      <div
        className="volunteer-help-close"
        onClick={onHelpButtonClick}
        onKeyDown={onHelpButtonClick}
        role="button"
        tabIndex={0}
      >
        X
      </div>
      <p>
        <b>How it works:</b>
        <br />
        Click and drag to add your availability for the week.
        Available times will appear highlighted.
        <br />
        <br />
        To remove a time, reselect the time slot(s).
        Update and change your availability anytime when needed.
        <br />
        <br />
        <b>Why are we asking?:</b>
        <br />
        We may need to contact you last minute for events
        with a sudden volunteer shortage.
        Please add a time only if you will be able to attend an event during that time frame.
        {' '}
      </p>
    </div>
  </div>
);

HelpPopup.propTypes = {
  onHelpButtonClick: PropTypes.func.isRequired,
};

export default HelpPopup;
