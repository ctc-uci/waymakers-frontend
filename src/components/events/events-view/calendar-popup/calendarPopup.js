import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, connect } from 'react-redux';

import EventPopup from '../../event-popup/eventPopup';
import HoursPopup from '../../hours-popup/hoursPopup';
import DialogueBox from '../../../admin/dialogue-box/dialogueBox';
import EditEventPopup from '../../edit-events/editEventPopup';

import store from '../../redux/store';
import {
  getShowPopup,
  getSelectedEvent,
} from '../../redux/selectors';

import { setShowPopup } from '../../redux/actions';

const CalendarPopup = ({
  path,
}) => {
  const onClosePopup = () => {
    store.dispatch(setShowPopup(false));
  };

  // Volunteer Dashboard => AddPopup/EventPopup
  // Admin Aggregate Page => DialogueBox
  // Add/Modify/Remove Events Page => EditEventPopup
  function renderPopup() {
    const selectedEvent = useSelector(getSelectedEvent);

    if (useSelector(getShowPopup)) {
      // Event is NOT on the user's calendar
      switch (path) {
        case '/volunteer/events':
          return <EventPopup event={selectedEvent} />;
        case '/events':
        // TODO: Add View Event Info Popup here when it is created
        // if (popupType === 'EditEventsPopup') {
          //   return (
          //     <EditEventPopup
          //       onClose={onClosePopup}
          //       event={selectedEvent}
          //     />
          //   );
          // }
          return (
            <EditEventPopup
              onClose={onClosePopup}
              event={selectedEvent}
            />
          );
        case '/admin/aggregate':
          return <DialogueBox onClose={onClosePopup} event={selectedEvent} />;
        default: break;
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
  path: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  selectedEvent: getSelectedEvent(state),
});

export default connect(mapStateToProps, null)(CalendarPopup);
