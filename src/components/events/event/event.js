import React from 'react';
import PropTypes from 'prop-types';
import './event.css';

const Event = ({ event }) => {
  // TODO: Pass in function as prop for + button
  // TODO: Need toggle functionality for the v button
  const dateAndTime = `${event.date}__${event.time}`;

  return (
    <div className="eventContainer">
      <div className="buttonContainer">
        <table>
          <tr>
            <td className="actionButton">
              <button className="actionButton" type="submit">+</button>
            </td>
            <td className="condensedEventDetails">
              <p className="eventName">{event.name}</p>
              <p className="eventShortDetails">
                {dateAndTime}
              </p>
            </td>
            <td className="arrowContainer">
              <p>v</p>
            </td>
          </tr>
        </table>
        <div>{event.location}</div>
        <div>{event.description}</div>
      </div>
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.objectOf(String).isRequired,
};

export default Event;
