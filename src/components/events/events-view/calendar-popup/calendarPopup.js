import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import EventPopup from '../../event-popup/eventPopup';
import HoursPopup from '../../hours-popup/hoursPopup';
import DialogueBox from '../../../admin/dialogue-box/dialogueBox';
import EditEventPopup from '../../edit-events/editEventPopup';

import store from '../../redux/store';
import {
  getShowPopup,
} from '../../redux/selectors';

import { setShowPopup } from '../../redux/actions';

const CalendarPopup = ({
  userEvents,
  selectedEvent,
  setShowEditPopup,
  path,
  showEditPopup,
  showMoreEvents,
  confirmAddEvent,
  setConfirmAddEvent,
}) => {
  const onClosePopup = () => {
    store.dispatch(setShowPopup(false));
  };

  // Volunteer Dashboard => AddPopup/EventPopup
  // Admin Aggregate Page => DialogueBox
  // Add/Modify/Remove Events Page => EditEventPopup
  function renderPopup() {
    const found = userEvents.filter((event) => event.id === parseInt(selectedEvent.id, 10));

    if (useSelector(getShowPopup) || showEditPopup) {
      // Event is NOT on the user's calendar
      if (showMoreEvents && found.length !== 1) {
        switch (path) {
          case '/volunteer/events':
            return (
              <EventPopup
                event={selectedEvent}
                onClose={onClosePopup}
                canAdd={found.length !== 1}
                confirmAddEvent={confirmAddEvent}
                setConfirmAddEvent={setConfirmAddEvent}
              />
            );
          case '/events':
            if (showEditPopup) {
              return (
                <EditEventPopup
                  onClose={() => setShowEditPopup(false)}
                  event={selectedEvent}
                />
              );
            }
            return (
              <EventPopup
                onClose={onClosePopup}
                event={selectedEvent}
                canAdd={false}
                showEditButton
                onEditButtonClick={() => setShowEditPopup(true)}
              />
            );
          case '/admin/aggregate':
            return <DialogueBox onClose={onClosePopup} event={selectedEvent} />;
          default: break;
        }
      } else if (showMoreEvents) {
        switch (path) {
          case '/events':
            if (showEditPopup) {
              return (
                <EditEventPopup
                  onClose={() => setShowEditPopup(false)}
                  event={selectedEvent}
                />
              );
            }
            return (
              <EventPopup
                onClose={onClosePopup}
                event={selectedEvent}
                canAdd={false}
                showEditButton
                onEditButtonClick={() => setShowEditPopup(true)}
              />
            );
          case '/admin/aggregate':
            return <DialogueBox onClose={onClosePopup} event={selectedEvent} />;
          default: break;
        }
      }
      // Event is on the user's calendar already
      return (
        <HoursPopup
          onClose={onClosePopup}
          event={selectedEvent}
        />
      );
    }
    return null;
  }

  return (
    <div>
      {renderPopup()}
    </div>
  );
};

CalendarPopup.propTypes = {
  userEvents: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  selectedEvent: PropTypes.objectOf(PropTypes.any).isRequired,
  setShowEditPopup: PropTypes.func.isRequired,
  showEditPopup: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  showMoreEvents: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  confirmAddEvent: PropTypes.bool.isRequired,
  setConfirmAddEvent: PropTypes.func.isRequired,
};

export default CalendarPopup;
