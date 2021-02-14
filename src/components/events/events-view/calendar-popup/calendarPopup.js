import React from 'react';
import PropTypes from 'prop-types';

import EventPopup from '../../event-popup/eventPopup';
import HoursPopup from '../../hours-popup/hoursPopup';
import DialogueBox from '../../../admin/dialogue-box/dialogueBox';
import EditEventPopup from '../../edit-events/editEventPopup';

const CalendarPopup = ({
  userEvents,
  selectedEvent,
  setShowPopup,
  setShowEditPopup,
  path,
  showPopup,
  showEditPopup,
  showMoreEvents,
}) => {
  // Volunteer Dashboard => AddPopup/EventPopup
  // Admin Aggregate Page => DialogueBox
  // Add/Modify/Remove Events Page => EditEventPopup
  function renderPopup() {
    const found = userEvents.filter((event) => event.id === parseInt(selectedEvent.id, 10));

    if (showPopup || showEditPopup) {
      // Event is NOT on the user's calendar
      if (showMoreEvents && found.length !== 1) {
        switch (path) {
          case '/volunteer/events':
            return (
              <EventPopup
                event={selectedEvent}
                onClose={() => setShowPopup(false)}
                canAdd={found.length !== 1}
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
                onClose={() => setShowPopup(false)}
                event={selectedEvent}
                canAdd={false}
                showEditButton
                onEditButtonClick={() => setShowEditPopup(true)}
              />
            );
          case '/admin/aggregate':
            return <DialogueBox onClose={() => setShowPopup(false)} event={selectedEvent} />;
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
                onClose={() => setShowPopup(false)}
                event={selectedEvent}
                canAdd={false}
                showEditButton
                onEditButtonClick={() => setShowEditPopup(true)}
              />
            );
          case '/admin/aggregate':
            return <DialogueBox onClose={() => setShowPopup(false)} event={selectedEvent} />;
          default: break;
        }
      }
      // Event is on the user's calendar already
      return (
        <HoursPopup
          onClose={() => setShowPopup(false)}
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
  setShowPopup: PropTypes.func.isRequired,
  setShowEditPopup: PropTypes.func.isRequired,
  showEditPopup: PropTypes.bool.isRequired,
  showPopup: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  showMoreEvents: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

export default CalendarPopup;
