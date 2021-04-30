/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Datetime from 'react-datetime';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  LightModal, LightModalHeader, LightModalBody, LightModalButton,
} from '../../../common/LightModal';
import {
  ValidatedField,
} from '../../../common/formikExtensions';

import './newEventForm.css';

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
  CopyEventForm: 'Create Copy',
};

const createEventObject = (values) => ({
  // e.toString().substring(0, e.toString().length - 8)
  eventName: values.eventName,
  eventType: values.eventType,
  eventLocation: values.eventLocation,
  eventDescription: values.eventDescription,
  division: values.eventDivision.replace(/-/g, ' '),
  eventLimit: values.eventLimit,
  startTime: moment(values.eventStartTime).format(),
  endTime: moment(values.eventEndTime).format(),
  isAllDay: (new Date(values.eventStartTime)).getDate()
    < (new Date(values.eventEndTime)).getDate(),
});

const EventForm = () => {
  const dispatch = useDispatch();
  const event = useSelector(getSelectedEvent);
  const popupType = useSelector(getPopupType);
  const isModalOpen = useSelector(getShowPopup);
  const handleAddEvent = async (values) => {
    const newEvent = createEventObject(values);
    dispatch(addEvent(newEvent));
    dispatch(setShowPopup(false));
  };

  const handleModifyEvent = async (values) => {
    const editedEvent = { ...createEventObject(values), eventId: event.id };
    console.log(values.eventStartTime > values.eventEndTime);
    dispatch(editEvent(event.id, editedEvent));
    dispatch(setShowPopup(false));
  };

  const handleDeleteEvent = async (eventId) => {
    dispatch(deleteEvent(eventId));
    dispatch(setShowPopup(false));
  };

  const renderActionButtonSet = (formik) => {
    switch (popupType) {
      case 'AddEventForm':
        return (
          <>
            <LightModalButton
              primary
              type="submit"
              onClick={() => {
              // e.preventDefault();
                formik.setFieldValue('action', 'addEvent');
              }}
            >
              Submit
            </LightModalButton>
            <LightModalButton
              secondaryOutline
              onClick={() => dispatch(setShowPopup(false))}
            >
              Cancel
            </LightModalButton>
          </>
        );
      case 'ViewEventInfoPopup':
        return (
          <>
            <Link to={`/admin/event/${event.id}`} className="view-data-container">
              <button type="submit" className="view-data-button">
                View Event Analytics
              </button>
            </Link>
            <LightModalButton
              secondary
              type="button"
              onClick={(e) => {
                e.preventDefault();
                dispatch(changePopupType('ModifyEventForm'));
              }}
            >
              Edit Event
            </LightModalButton>
            <LightModalButton
              type="submit"
              secondary
              onClick={(e) => {
                e.preventDefault();
                dispatch(changePopupType('CopyEventForm'));
                // formik.setFieldValue('action', 'duplicateEvent');
              }}
            >
              Copy
            </LightModalButton>
          </>
        );
      case 'ModifyEventForm':
        return (
          <>
            <LightModalButton
              type="submit"
              primary
              onClick={() => {
                formik.setFieldValue('action', 'modifyEvent');
              }}
            >
              Save
            </LightModalButton>
            <LightModalButton
              type="submit"
              danger
              onClick={() => {
                formik.setFieldValue('action', 'deleteEvent');
              }}
            >
              Delete
            </LightModalButton>
          </>
        );
      case 'CopyEventForm':
        return (
          <>
            <LightModalButton
              type="submit"
              primary
              onClick={() => {
                formik.setFieldValue('action', 'duplicateEvent');
              }}
            >
              Save
            </LightModalButton>
            <LightModalButton
              danger
              onClick={() => {
                dispatch(setShowPopup(false));
              }}
            >
              Delete
            </LightModalButton>
          </>
        );
      default:
        return (
          <LightModalButton secondaryOutline onClick={() => dispatch(setShowPopup(false))}>
            Cancel
          </LightModalButton>
        );
    }
  };

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
          handleModifyEvent(values);
          break;
        case 'cancel':
          dispatch(setShowPopup(false));
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
        formik.setFieldValue('eventStartTime', new Date());
        formik.setFieldValue('eventEndTime', new Date());
        formik.setFieldValue('eventDescription', '');
        formik.setFieldValue('eventDivision', 'Crisis-Response-Team');
        formik.setFieldValue('eventLimit', '');
        break;
      default:
        formik.setFieldValue('eventName', event.title);
        formik.setFieldValue('eventType', event.eventType);
        formik.setFieldValue('eventLocation', event.location);
        formik.setFieldValue('eventStartTime', new Date(event.startTime));
        formik.setFieldValue('eventEndTime', new Date(event.endTime));
        formik.setFieldValue('eventDescription', event.description);
        formik.setFieldValue('eventDivision', event.division.replace(/\s+/g, '-'));
        formik.setFieldValue('eventLimit', event.eventLimit);
    }
  }, [popupType]);

  const getInputClassName = () => {
    console.log('here');
    return (popupType === 'ViewEventInfoPopup') ? 'form-input-color view-mode-input-color' : 'form-input-color';
  };

  const getDatetimeInputClassName = () => {
    console.log('here');
    return (popupType === 'ViewEventInfoPopup') ? 'view-mode-input-color form-input-color datetime-input' : 'form-input-color datetime-input';
  };

  const updateNewDate = (e, startOrEnd, value) => {
    console.log(e);
    console.log(value);
    const newDate = new Date(e);
    const newValue = new Date(value);
    newValue.setDate(newDate.getDate());
    newValue.setMonth(newDate.getMonth());
    newValue.setFullYear(newDate.getFullYear());
    if (popupType !== 'ViewEventInfoPopup') {
      formik.setFieldValue(startOrEnd, newValue);
    }
  };

  return (
    <LightModal isOpen={isModalOpen} setIsOpen={setShowPopup}>
      <LightModalHeader
        title={popupTypeToTitleMap[popupType]}
        onClose={() => dispatch(setShowPopup(false))}
      />
      <form onSubmit={formik.handleSubmit}>
        <LightModalBody>

          {/* Using LightModalValidatedField */}
          <ValidatedField name="eventName" labelText="Name" isRequired formik={formik}>
            <input
              id="eventName"
              name="eventName"
              type="text"
              className={getInputClassName()}
              onChange={formik.handleChange}
              value={formik.values.eventName}
              readOnly={popupType === 'ViewEventInfoPopup'}
              required
            />
          </ValidatedField>

          {/* Using LightModalValidatedField */}
          <ValidatedField name="eventType" labelText="Type" isRequired formik={formik}>
            <select
              id="eventType"
              name="eventType"
              disabled={popupType === 'ViewEventInfoPopup'}
              className={getInputClassName()}
              value={formik.values.eventType}
              onChange={formik.handleChange}
              required
            >
              <option value="Volunteer">Volunteer</option>
              <option value="Outreach">Outreach</option>
              <option value="Other">Other</option>
            </select>
          </ValidatedField>

          {/* Using LightModalValidatedField */}
          <ValidatedField name="eventLocation" labelText="Location" isRequired formik={formik}>
            <input
              id="eventLocation"
              name="eventLocation"
              type="text"
              className={getInputClassName()}
              onChange={formik.handleChange}
              value={formik.values.eventLocation}
              readOnly={popupType === 'ViewEventInfoPopup'}
              required
            />
          </ValidatedField>

          <div className="datetime-input-container">
            {/* datetime input type */}
            <ValidatedField name="eventStartTime" labelText="Start" isRequired formik={formik}>
              <Datetime
                id="eventStartTime"
                name="eventStartTime"
                // type="dateTime-local"
                initialValue={new Date()}
                onChange={(e) => updateNewDate(e, 'eventStartTime', formik.values.eventStartTime)}
                value={formik.values.eventStartTime}
                readOnly={popupType === 'ViewEventInfoPopup'}
                inputProps={{ className: getDatetimeInputClassName() }}
                timeFormat={false}
                required
              />
              <Datetime
                id="eventStartTime"
                name="eventStartTime"
                // type="dateTime-local"
                initialValue={new Date()}
                onChange={(e) => { if (popupType !== 'ViewEventInfoPopup') formik.setFieldValue('eventStartTime', new Date(e)); }}
                value={formik.values.eventStartTime}
                readOnly={popupType === 'ViewEventInfoPopup'}
                dateFormat={false}
                required
              />
            </ValidatedField>
            <p className="datetime-input-separator">to</p>
            <ValidatedField name="eventEndTime" labelText="End" isRequired formik={formik}>
              <Datetime
                id="eventEndTime"
                name="eventEndTime"
                // type="dateTime-local"
                initialValue={new Date()}
                onChange={(e) => updateNewDate(e, 'eventEndTime', formik.values.eventEndTime)}
                value={formik.values.eventEndTime}
                readOnly={popupType === 'ViewEventInfoPopup'}
                inputProps={{ className: getDatetimeInputClassName() }}
                timeFormat={false}
                required
              />
              <Datetime
                id="eventEndTime"
                name="eventEndTime"
                // type="dateTime-local"
                initialValue={new Date()}
                onChange={(e) => { if (popupType !== 'ViewEventInfoPopup') formik.setFieldValue('eventEndTime', new Date(e)); }}
                value={formik.values.eventEndTime}
                readOnly={popupType === 'ViewEventInfoPopup'}
                dateFormat={false}
                required
              />
            </ValidatedField>
          </div>

          <ValidatedField name="eventDescription" labelText="Description" formik={formik} isRequired>
            <textarea
              id="eventDescription"
              name="eventDescription"
              type="text"
              className={(popupType === 'ViewEventInfoPopup') ? 'form-input-color view-mode-input-color description-input' : 'form-input-color description-input'}
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

          <ValidatedField name="eventLimit" labelText="Limit" isRequired formik={formik}>
            <input
              id="eventLimit"
              name="eventLimit"
              type="number"
              className={getInputClassName()}
              min="1"
              onChange={formik.handleChange}
              value={formik.values.eventLimit}
              readOnly={popupType === 'ViewEventInfoPopup'}
            />
          </ValidatedField>

          <ValidatedField name="eventDivision" labelText="Division" isRequired formik={formik}>
            <select
              id="eventDivision"
              name="eventDivision"
              className={getInputClassName()}
              value={formik.values.eventDivision}
              onChange={formik.handleChange}
              disabled={popupType === 'ViewEventInfoPopup'}
              required
            >
              <option value="Crisis-Response-Team">Crisis Response Team</option>
              <option value="Gang-Services">Gang Services</option>
              <option value="Human-Trafficking">Human Trafficking</option>
            </select>
          </ValidatedField>
          <br />
          {renderActionButtonSet(formik)}
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
