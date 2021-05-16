/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  useFormik,
} from 'formik';
import * as Yup from 'yup';
import Datetime from 'react-datetime';
import { useCookies } from 'react-cookie';

import {
  LightModal, LightModalHeader, LightModalBody, LightModalButton,
} from '../../../../common/LightModal';
import {
  ValidatedField,
} from '../../../../common/formikExtensions';
import { WMKBackend } from '../../../../common/utils';
import TextArea from '../../../../common/TextArea/TextArea';

import useDivisions from '../useDivisions';
import useUserEvents from '../useUserEvents';

import '../unsubmittedHours/SubmitHoursPopup.css';

// Using Yup to do schema validation
const Schema = Yup.object().shape({
  name: Yup.string().required('Required'),
  type: Yup.string().required('Required'),
  title: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  startTime: Yup.string().required('Required'),
  endTime: Yup.string().required('Required'),
  totalHours: Yup.string().required('Required'),
  division: Yup.string().required('Required'),
  additionalNotes: Yup.string(),
});

// Fill in form according to the selected event title
const autofillEventInfo = (
  eventId,
  userEvents,
  formik,
  additionalNotes,
  logStart,
  logEnd,
) => {
  // No op on default empty option
  if (!eventId) { return; }

  // No op with no userEvents
  if (!userEvents || userEvents.length === 0) { return; }
  // No op with no formik
  if (!formik) { return; }
  const selectedUserEvent = userEvents
    .filter((e) => e.id.toString() === eventId.toString())[0];

  formik.setFieldValue('id', selectedUserEvent.id);
  formik.setFieldValue('type', selectedUserEvent.eventType);
  formik.setFieldValue('title', selectedUserEvent.title);
  formik.setFieldValue('location', selectedUserEvent.location);
  formik.setFieldValue('startTime', new Date(logStart));
  formik.setFieldValue('endTime', new Date(logEnd));
  formik.setFieldValue('division', selectedUserEvent.division);
  formik.setFieldValue('totalHours', Math.ceil((new Date(logEnd) - new Date(logStart)) / (1000 * 60 * 60)));
  formik.setFieldValue('additionalNotes', additionalNotes);
};

// TODO: Loading state
const ViewHoursPopup = (
  {
    isModalOpen,
    setIsViewModalOpen,
    setIsResubmitModalOpen,
    eventId = '',
    additionalNotes,
    logStart,
    logEnd,
  },
) => {
  const [divisions] = useDivisions();
  const [userEvents] = useUserEvents();
  const [events, setEvents] = useState([]);
  const [cookies] = useCookies(['userId']);

  const formik = useFormik({
    initialValues: {
      name: localStorage.getItem('userFullName'),
      id: '',
      type: '',
      title: '',
      location: '',
      startTime: new Date(),
      endTime: new Date(),
      totalHours: '',
      division: '',
      additionalNotes: '',
      checked: false,
    },
    validationSchema: Schema,
    validateOnBlur: false,
    validateOnChange: false,
  });

  const loadSubmittedEvents = async () => {
    const submittedHours = await WMKBackend.get('/logs/submitted', {
      params: {
        userId: cookies.userId,
      },
    });
    setEvents(submittedHours.data);
  };

  useEffect(async () => {
    await loadSubmittedEvents();
  }, []);

  useEffect(() => {
    autofillEventInfo(eventId,
      userEvents,
      formik,
      additionalNotes,
      logStart,
      logEnd);
  }, [eventId, userEvents]);

  const truncateEventName = (eventName) => {
    let truncateName = eventName.substring(0, 30);
    truncateName += (eventName !== truncateName ? '...' : '');
    return truncateName;
  };

  return (
    <LightModal isOpen={isModalOpen} setIsOpen={setIsViewModalOpen}>
      <LightModalHeader
        title="Event Information"
        onClose={() => setIsViewModalOpen(false)}
      />
      <LightModalBody>

        <ValidatedField name="name" labelText="Name" formik={formik}>
          <input
            id="name"
            name="name"
            type="text"
            className="form-input-color view-mode-input-color"
            value={formik.values.name}
            readOnly
          />
        </ValidatedField>

        <ValidatedField name="title" labelText="Title of Event" formik={formik}>
          <select
            id="title"
            name="Title of Event"
            value={formik.values.title}
            className="form-input-color view-mode-input-color"
            disabled
          >
            <option value="">{events.length !== 0 ? ' ' : 'No hours to log yet.'}</option>
            {events.map((event) => (
              <option
                key={event.id}
                value={event.title || event.eventName}
                id={event.id}
              >
                {truncateEventName(event.title || event.eventName)}
              </option>
            ))}
          </select>
        </ValidatedField>

        <ValidatedField name="type" labelText="Type" formik={formik}>
          <input
            id="type"
            name="type"
            type="text"
            className="form-input-color view-mode-input-color"
            value={formik.values.type}
            readOnly
          />
        </ValidatedField>

        <ValidatedField name="division" labelText="Division" formik={formik}>
          <select
            id="division"
            name="division"
            value={formik.values.division}
            className="form-input-color view-mode-input-color"
            disabled
          >
            <option value="">{' '}</option>
            {divisions.map((division) => (
              <option
                key={division.div_name}
                value={division.div_name}
              >
                {division.div_name}
              </option>
            ))}
          </select>
        </ValidatedField>

        <ValidatedField name="location" labelText="Location" formik={formik}>
          <input
            id="location"
            name="location"
            type="text"
            className="form-input-color view-mode-input-color"
            value={formik.values.location}
            readOnly
          />
        </ValidatedField>

        <div className="datetime-input-container">
          {/* datetime input type */}
          <ValidatedField name="startTime" labelText="Start" isRequired formik={formik}>
            <Datetime
              id="startTime"
              name="startTime"
              initialValue={new Date()}
              value={formik.values.startTime}
              inputProps={{ className: 'datetime-input form-input-color view-mode-input-color' }}
              timeFormat={false}
              required
              readOnly
            />
            <Datetime
              id="startTime"
              name="startTime"
              initialValue={new Date()}
              value={formik.values.startTime}
              dateFormat={false}
              required
              inputProps={{ className: 'datetime-input form-input-color view-mode-input-color' }}
              readOnly
            />
          </ValidatedField>
          <p className="datetime-input-separator">to</p>
          <div className="date-picker-right">
            <ValidatedField name="endTime" labelText="End" isRequired formik={formik}>
              <Datetime
                id="endTime"
                name="endTime"
                initialValue={new Date()}
                value={formik.values.endTime}
                inputProps={{ className: 'datetime-input form-input-color view-mode-input-color' }}
                timeFormat={false}
                required
                readOnly
              />
              <Datetime
                id="endTime"
                name="endTime"
                initialValue={new Date()}
                value={formik.values.endTime}
                dateFormat={false}
                inputProps={{ className: 'datetime-input form-input-color view-mode-input-color' }}
                required
                readOnly
              />
            </ValidatedField>
          </div>
        </div>

        <ValidatedField name="totalHours" labelText="Total Hours" isRequired formik={formik}>
          <input
            id="totalHours"
            name="totalHours"
            type="number"
            className="form-input-color total-hours-width"
            value={formik.values.totalHours}
            readOnly
          />
        </ValidatedField>

        <ValidatedField name="additionalNotes" labelText="Additional Notes (Optional)" formik={formik}>
          <TextArea
            id="additionalNotes"
            name="additionalNotes"
            value={formik.values.additionalNotes || ''}
            className="form-input-color view-mode-input-color"
            readOnly
          />
        </ValidatedField>
        <br />
        <LightModalButton secondary type="button" onClick={() => { setIsResubmitModalOpen(true); setIsViewModalOpen(false); }}>
          Resubmit
        </LightModalButton>
        <LightModalButton type="button" secondaryOutline onClick={() => setIsViewModalOpen(false)}>
          Cancel
        </LightModalButton>
      </LightModalBody>
    </LightModal>
  );
};

ViewHoursPopup.defaultProps = {
  additionalNotes: '',
  logStart: new Date(),
  logEnd: new Date(),
};

ViewHoursPopup.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsViewModalOpen: PropTypes.func.isRequired,
  setIsResubmitModalOpen: PropTypes.func.isRequired,
  eventId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  additionalNotes: PropTypes.string,
  logStart: PropTypes.string,
  logEnd: PropTypes.string,
};

export default ViewHoursPopup;
