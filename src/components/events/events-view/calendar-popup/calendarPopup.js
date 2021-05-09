import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch, connect } from 'react-redux';

import EventPopup from '../../event-popup/eventPopup';
import SubmitHoursPopup from '../../../volunteer/volHours/unsubmittedHours/SubmitHoursPopup';
import DialogueBox from '../../../admin/dialogue-box/dialogueBox';
import EventForm from '../../edit-events/newEventForm';
import { getRegularSelectedEvent } from '../../util';

import {
  getShowPopup,
  getSelectedEvent,
  getPopupType,
  getEvents,
} from '../../redux/selectors';

import { setShowPopup } from '../../redux/actions';

const CalendarPopup = ({
  page,
}) => {
  const dispatch = useDispatch();
  const allRegularEvents = useSelector(getEvents);

  const onClosePopup = () => {
    dispatch(setShowPopup(false));
  };

  // Volunteer Dashboard => AddPopup/EventPopup
  // Admin Aggregate Page => DialogueBox
  // Add/Modify/Remove Events Page => EditEventPopup
  function renderPopup() {
    const currentEvent = useSelector(getSelectedEvent);

    // Convert current full calendar event to regular event
    const selectedEvent = getRegularSelectedEvent(allRegularEvents, currentEvent);

    const popupType = useSelector(getPopupType);
    const popupIsOpen = useSelector(getShowPopup);

    if (popupIsOpen) {
      // Event is NOT on the user's calendar
      switch (page) {
        case 'volunteerDashboard':
          // Event is on the user's calendar already
          if (popupType === 'LogHoursForm') {
            return (
              <SubmitHoursPopup
                isModalOpen={popupIsOpen}
                setIsModalOpen={(open) => dispatch(setShowPopup(open))}
                eventId={selectedEvent.id}
              />
            );
          }
          return <EventPopup event={selectedEvent} isOpen={popupIsOpen} />;
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
