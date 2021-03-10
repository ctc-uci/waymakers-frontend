/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Datetime from 'react-datetime';
import moment from 'moment';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  LightModal, LightModalHeader, LightModalBody, LightModalButton,
} from '../../../common/LightModal';
import {
  ValidatedField,
} from '../../../common/formikExtensions';

// import store from '../redux/store';
import store from '../redux/store';
// import redux selectors
import {
  getPopupType,
  getSelectedEvent,
  getShowPopup,
} from '../redux/selectors';
// import redux actions
import {
  setShowPopup,
  addEvent,
  changePopupType,
  deleteEvent,
  editEvent,
} from '../redux/actions';

// Using Yup to do schema validation
const EventFormSchema = Yup.object().shape({
  eventName: Yup.string()
    .required('Required'),
  eventType: Yup.string()
    .required('Required'),
  eventLocation: Yup.string()
    .required('Required'),
  eventDescription: Yup.string()
    .required('Required'),
  eventStartTime: Yup.string()
    .required('Required'),
  eventEndTime: Yup.string()
    .when(
      ['eventStartTime'],
      (eventStartTime, schema) => schema.test(
        'Start Date < End Date Test',
        'End time must be later than start time',
        (eventEndTime) => moment(eventStartTime) < moment(eventEndTime),
      ),
    ),
  eventDivision: Yup.string()
    .required('Required'),
  eventLimit: Yup.number()
    .required('Required'),
});

const popupTypeToTitleMap = {
  AddEventForm: 'Add Event Information',
  ViewEventInfoPopup: 'View Event Information',
  ModifyEventForm: 'Edit Event Information',
};

// const popupTypeToActionButtons = {
//   AddEventForm: 'Add Event Information',
//   ViewEventInfoPopup: 'View Event Information',
//   ModifyEventForm: 'Edit Event Information',
// };

/*
const renderActionButtonSet = (popupType) => {
  switch (popupType){
    case 'AddEventForm':
      s
  }
}
*/

const createEventObject = (values) => ({
  // e.toString().substring(0, e.toString().length - 8)
  eventName: values.eventName,
  eventType: values.eventType,
  eventLocation: values.eventLocation,
  eventDescription: values.eventDescription,
  division: values.eventDivision.replace(/-/g, ' '),
  eventLimit: values.eventLimit,
  startTime: values.eventStartTime.format(),
  endTime: values.eventEndTime.format(),
  isAllDay: false, // default to false right now
});

const handleAddEvent = async (values) => {
  const newEvent = createEventObject(values);
  store.dispatch(addEvent(newEvent));
  store.dispatch(setShowPopup(false));
};

const handleModifyEvent = async (event, values) => {
  const editedEvent = { ...createEventObject(values), eventId: event.id };
  console.log(values.eventStartTime > values.eventEndTime);
  // console.log(moment(values.endTime).diff(moment(values.startTime) > 0));
  store.dispatch(editEvent(event.id, editedEvent));
  store.dispatch(setShowPopup(false));
};

const handleDeleteEvent = async (eventId) => {
  store.dispatch(deleteEvent(eventId));
  store.dispatch(setShowPopup(false));
};

// const handleDuplicateEvent = async (values) => {
//   const newEvent = createEventObject(values);
//   store.dispatch(addEvent(newEvent));
//   store.dispatch(setShowPopup(false));
// };

// const renderActionButtonSet2 = (popupType, formik) => {
//   switch (popupType) {
//     case 'ViewEventInfoPopup':
//       return (
//         <>
//           <button
//             type="button"
//             onClick={() => store.dispatch(changePopupType('ModifyEventForm'))}
//           >
//             Testing
//           </button>
//           <LightModalButton
//             danger
//             id="asdf"
//             type="button"
//             onClick={() => store.dispatch(changePopupType('ModifyEventForm'))}
//           >
//             Testing
//           </LightModalButton>
//         </>
//       );
//     case 'ModifyEventForm':
//       return (
//         <>
//           <LightModalButton primary
// type="submit" onClick={() => formik.setFieldValue('action', 'modifyEvent')}>
//             Save
//           </LightModalButton>
//           <LightModalButton secondaryOutline
// type="submit" onClick={() => { formik.setFieldValue('action', 'addEvent'); }}>
//             Duplicate
//           </LightModalButton>
//           <LightModalButton primary type="submit"
//  onClick={() => formik.setFieldValue('action', 'deleteEvent')}>
//             Delete
//           </LightModalButton>
//           {/* <button type="submit" onClick={(e) => onSubmitModifyEvent(e)}>Save</button>
//           <button type="submit" onClick={() => {}}>Duplicate</button>
//           <button type="submit" onClick={() => console.log('Event Delete')}>Delete</button>
//           <button type="submit" onClick={onSubmitAddEvent}>Delete</button> */}
//         </>
//       );
//     default:
//   }

//   return '';
// };

const renderActionButtonSet = (popupType, formik) => {
  switch (popupType) {
    case 'AddEventForm':
      return (
        <>
          <LightModalButton primary type="submit" onClick={() => { formik.setFieldValue('action', 'addEvent'); }}>
            Submit
          </LightModalButton>
          <LightModalButton secondaryOutline type="submit" onClick={() => { formik.setFieldValue('action', 'cancel'); }}>
            Cancel
          </LightModalButton>
        </>
      );
    case 'ViewEventInfoPopup':
      return (
        <>
          <LightModalButton
            primary
            type="button"
            onClick={() => store.dispatch(changePopupType('ModifyEventForm'))}
          >
            Edit Event
          </LightModalButton>
          {/* <LightModalButton
            type="button"
            onClick={() => store.dispatch(changePopupType('ModifyEventForm'))}
          >
            Edit Event
          </LightModalButton> */}
          <LightModalButton secondaryOutline onClick={() => store.dispatch(setShowPopup(false))}>
            Cancel
          </LightModalButton>
        </>
      );
    case 'ModifyEventForm':
      return (
        <>
          <LightModalButton primary type="submit" onClick={() => formik.setFieldValue('action', 'modifyEvent')}>
            Save
          </LightModalButton>
          <LightModalButton secondary type="submit" onClick={() => { formik.setFieldValue('action', 'addEvent'); }}>
            Duplicate
          </LightModalButton>
          <LightModalButton danger type="submit" onClick={() => formik.setFieldValue('action', 'deleteEvent')}>
            Delete
          </LightModalButton>
          {/* <button type="submit" onClick={(e) => onSubmitModifyEvent(e)}>Save</button>
          <button type="submit" onClick={() => {}}>Duplicate</button>
          <button type="submit" onClick={() => console.log('Event Delete')}>Delete</button>
          <button type="submit" onClick={onSubmitAddEvent}>Delete</button> */}
        </>
      );
    default:
      console.log('No matching Popup Tye');
      return (
        <LightModalButton secondaryOutline onClick={() => store.dispatch(setShowPopup(false))}>
          Cancel
        </LightModalButton>
      );
  }
};

const EventForm = () => {
  const event = useSelector(getSelectedEvent);
  const popupType = useSelector(getPopupType);
  const isModalOpen = useSelector(getShowPopup);

  const formik = useFormik({
    initialValues: {
      eventName: '',
      eventType: '',
      eventLocation: '',
      eventStartTime: '',
      eventEndTime: '',
      eventDescription: '',
      eventDivision: '',
      eventLimit: '',
      action: '',
    },
    validationSchema: EventFormSchema,
    onSubmit: (values) => {
      console.log('onsubmit');
      switch (values.action) {
        case 'addEvent':
          handleAddEvent(values);
          break;
        case 'duplicateEvent':
          handleAddEvent(values);
          break;
        case 'deleteEvent':
          handleDeleteEvent(event.id);
          break;
        case 'modifyEvent':
          handleModifyEvent(event, values);
          break;
        case 'cancel':
          store.dispatch(setShowPopup(false));
          break;
        default:
          console.log('something broke');
          break;
      }
    },
    // validate only on submit, change as needed
    validateOnBlur: false,
    validateOnChange: false,
  });

  useEffect(() => {
    switch (popupType) {
      case 'AddEventForm':
        formik.setFieldValue('eventName', '');
        formik.setFieldValue('eventType', 'Volunteer');
        formik.setFieldValue('eventLocation', '');
        formik.setFieldValue('eventStartTime', null);
        formik.setFieldValue('eventEndTime', null);
        formik.setFieldValue('eventDescription', '');
        formik.setFieldValue('eventDivision', 'Crisis-Response-Team');
        formik.setFieldValue('eventLimit', '');
        break;
      default:
        formik.setFieldValue('eventName', event.title);
        formik.setFieldValue('eventType', event.extendedProps.eventType);
        formik.setFieldValue('eventLocation', event.extendedProps.location);
        formik.setFieldValue('eventStartTime', moment(event.start));
        formik.setFieldValue('eventEndTime', moment(event.end));
        formik.setFieldValue('eventDescription', event.extendedProps.description);
        formik.setFieldValue('eventDivision', event.extendedProps.division.replace(/\s+/g, '-'));
        formik.setFieldValue('eventLimit', event.extendedProps.eventLimit);
    }
  }, [popupType]);

  return (
    <LightModal isOpen={isModalOpen} setIsOpen={setShowPopup}>
      <LightModalHeader
        title={popupTypeToTitleMap[popupType]}
        onClose={() => store.dispatch(setShowPopup(false))}
      />
      <form onSubmit={formik.handleSubmit}>
        <LightModalBody>

          {/* Using LightModalValidatedField */}
          <ValidatedField name="eventName" labelText="Name" formik={formik}>
            <input
              id="eventName"
              name="eventName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.eventName}
              readOnly={popupType === 'ViewEventInfoPopup'}
            />
          </ValidatedField>

          {/* Using LightModalValidatedField */}
          <ValidatedField name="eventType" labelText="Type" formik={formik}>
            <select
              id="eventType"
              name="eventType"
              value={formik.values.eventType}
              onChange={formik.handleChange}
              readOnly={popupType === 'ViewEventInfoPopup'}
            >
              <option value="Volunteer">Volunteer</option>
              <option value="Outreach">Outreach</option>
              <option value="Other">Other</option>
            </select>
          </ValidatedField>

          {/* Using LightModalValidatedField */}
          <ValidatedField name="eventLocation" labelText="Location" formik={formik}>
            <input
              id="eventLocation"
              name="eventLocation"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.eventLocation}
              readOnly={popupType === 'ViewEventInfoPopup'}
            />
          </ValidatedField>

          {/* datetime input type */}
          <ValidatedField name="eventStartTime" labelText="Start Time" formik={formik}>
            <Datetime
              id="eventStartTime"
              name="eventStartTime"
              // type="dateTime-local"
              onChange={(e) => { if (popupType !== 'ViewEventInfoPopup') formik.setFieldValue('eventStartTime', e); }}
              value={formik.values.eventStartTime}
              readOnly={popupType === 'ViewEventInfoPopup'}
            />
          </ValidatedField>

          <ValidatedField name="eventEndTime" labelText="End Time" formik={formik}>
            <Datetime
              id="eventEndTime"
              name="eventEndTime"
              // type="dateTime-local"
              onChange={(e) => { if (popupType !== 'ViewEventInfoPopup') formik.setFieldValue('eventEndTime', e); }}
              value={formik.values.eventEndTime}
              readOnly={popupType === 'ViewEventInfoPopup'}
            />
          </ValidatedField>

          <ValidatedField name="eventDescription" labelText="Description" formik={formik}>
            <input
              id="eventDescription"
              name="eventDescription"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.eventDescription}
              readOnly={popupType === 'ViewEventInfoPopup'}
            />
          </ValidatedField>

          {/* Maybe add Recurring?!
          <ValidatedField name="eventEndType" labelText="End Time" formik={formik}>
            <input
              id="eventStartType"
              name="eventStartType"
              type="dateTime-local"
              onChange={formik.handleChange}
              value={formik.values.eventStartType}
            />
          </ValidatedField>
           */}

          <ValidatedField name="eventLimit" labelText="Limit" formik={formik}>
            <input
              id="eventLimit"
              name="eventLimit"
              type="number"
              min="1"
              onChange={formik.handleChange}
              value={formik.values.eventLimit}
              readOnly={popupType === 'ViewEventInfoPopup'}
            />
          </ValidatedField>

          <ValidatedField name="eventDivision" labelText="Division" formik={formik}>
            <select
              id="eventDivision"
              name="eventDivision"
              value={formik.values.eventDivision}
              onChange={formik.handleChange}
              readOnly={popupType === 'ViewEventInfoPopup'}
            >
              <option value="Crisis-Response-Team">Crisis Response Team</option>
              <option value="Gang-Services">Gang Services</option>
              <option value="Human-Trafficking">Human Trafficking</option>
            </select>
          </ValidatedField>

          {/* <LightModalButton primary type="submit">
            Submit
          </LightModalButton>
          <LightModalButton secondaryOutline onClick={() => store.dispatch(setShowPopup(false))}>
            Cancel
          </LightModalButton> */}
          {renderActionButtonSet(popupType, formik)}
          {/* {renderActionButtonSet2(popupType, formik)} */}
        </LightModalBody>
      </form>
    </LightModal>
  );
};

// EventForm.propTypes = {
//   isModalOpen: PropTypes.bool.isRequired,
//   setIsModalOpen: PropTypes.func.isRequired,
// };

export default EventForm;
