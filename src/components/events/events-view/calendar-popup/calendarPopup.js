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
  // getPopupType,
} from '../../redux/selectors';

import { setShowPopup } from '../../redux/actions';

const CalendarPopup = ({
  // setShowEditPopup,
  path,
  // showEditPopup,
  // popupType,
}) => {
  const onClosePopup = () => {
    store.dispatch(setShowPopup(false));
  };

  // Volunteer Dashboard => AddPopup/EventPopup
  // Admin Aggregate Page => DialogueBox
  // Add/Modify/Remove Events Page => EditEventPopup
  function renderPopup() {
    // const selectedEventId = parseInt(useSelector(getSelectedEvent).id, 10);
    // const found = userEvents.filter((event) => event.id === selectedEventId);
    const selectedEvent = useSelector(getSelectedEvent);

    if (useSelector(getShowPopup)) {
      // Event is NOT on the user's calendar
      switch (path) {
        case '/volunteer/events':
          return <EventPopup event={selectedEvent} />;
        case '/events':
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
      // } else if (showMoreEvents) {
      //   switch (path) {
      //     case '/events':
      //       if (popupType === 'EditEventsPopup') {
      //         return (
      //           <EditEventPopup
      //             onClose={onClosePopup}
      //             event={selectedEvent}
      //           />
      //         );
      //       }
      //       return (
      //         // TODO: Change this to render the view event info popup
      //         // <EventPopup
      //         //   event={selectedEvent}
      //         //   canAdd={false}
      //         //   showEditButton
      //         //   onEditButtonClick={onClosePopup}
      //         // />
      //         <EditEventPopup
      //           onClose={onClosePopup}
      //           event={selectedEvent}
      //         />
      //       );
      //     case '/admin/aggregate':
      //       return <DialogueBox onClose={onClosePopup} event={selectedEvent} />;
      //     default: break;
      //   }
      // }
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
  // userEvents: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  // setShowEditPopup: PropTypes.func.isRequired,
  // showEditPopup: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  // showMoreEvents: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  // confirmAddEvent: PropTypes.bool.isRequired,
  // setConfirmAddEvent: PropTypes.func.isRequired,
  // popupType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  selectedEvent: getSelectedEvent(state),
  // popupType: getPopupType(state),
});

export default connect(mapStateToProps, null)(CalendarPopup);
