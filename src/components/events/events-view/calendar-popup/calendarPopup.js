import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch, connect } from 'react-redux';

import EventPopup from '../../event-popup/eventPopup';
import HoursPopup from '../../hours-popup/hoursPopup';
import DialogueBox from '../../../admin/dialogue-box/dialogueBox';
import EventForm from '../../edit-events/newEventForm';

import {
  getShowPopup,
  getSelectedEvent,
  getPopupType,
} from '../../redux/selectors';

import { setShowPopup } from '../../redux/actions';

const CalendarPopup = ({
  page,
}) => {
  const dispatch = useDispatch();

  const onClosePopup = () => {
    dispatch(setShowPopup(false));
  };

  // Volunteer Dashboard => AddPopup/EventPopup
  // Admin Aggregate Page => DialogueBox
  // Add/Modify/Remove Events Page => EditEventPopup
  function renderPopup() {
    const selectedEvent = useSelector(getSelectedEvent);
    const popupType = useSelector(getPopupType);
    if (useSelector(getShowPopup)) {
      // Event is NOT on the user's calendar
      switch (page) {
        case 'volunteerDashboard':
          // Event is on the user's calendar already
          if (popupType === 'LogHoursForm') {
            return (
              <HoursPopup
                onClose={onClosePopup}
                event={selectedEvent}
              />
            );
          }
          return <EventPopup event={selectedEvent} />;
        case 'addModifyDeleteEventsPage':
          return (
            <EventForm />
          );
        case 'aggregatePage':
          return <DialogueBox onClose={onClosePopup} event={selectedEvent} />;
        default: break;
      }
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
  page: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  selectedEvent: getSelectedEvent(state),
});

export default connect(mapStateToProps, null)(CalendarPopup);
