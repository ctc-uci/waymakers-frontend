/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  useFormik,
} from 'formik';
import * as Yup from 'yup';
import Datetime from 'react-datetime';
import { useCookies } from 'react-cookie';
import * as Icon from 'react-icons/im';
import Checkbox from 'react-custom-checkbox';

import {
  LightModal, LightModalHeader, LightModalBody, LightModalButton,
} from '../../../../common/LightModal';
import {
  ValidatedField,
} from '../../../../common/formikExtensions';
import { WMKBackend } from '../../../../common/utils';
import { createAlert } from '../../../../common/AlertBanner/AlertBannerSlice';
import TextArea from '../../../../common/TextArea/TextArea';

import useDivisions from '../useDivisions';
import useUserEvents from '../useUserEvents';

import './SubmitHoursPopup.css';
import { fetchUnsubmittedEvents } from '../../../events/redux/actions';

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
  checked: Yup.mixed().oneOf([true], 'Required').required('Required'),
});

// Fill in form according to the selected event title
const autofillEventInfo = (eventId, userEvents, formik) => {
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
  formik.setFieldValue('startTime', new Date(selectedUserEvent.startTime));
  formik.setFieldValue('endTime', new Date(selectedUserEvent.endTime));
  formik.setFieldValue('division', selectedUserEvent.division);
  formik.setFieldValue('totalHours', Math.ceil((new Date(selectedUserEvent.endTime) - new Date(selectedUserEvent.startTime)) / (1000 * 60 * 60)));
};

// TODO: Loading state
const SubmitHoursPopup = ({ isModalOpen, setIsModalOpen, eventId = '' }) => {
  const dispatch = useDispatch();
  const [divisions] = useDivisions();
  const [userEvents] = useUserEvents();
  const [unsubmittedEvents, setUnsubmittedEvents] = useState([]);
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
    onSubmit: (values) => {
      const selectedUserEvent = unsubmittedEvents.filter(
        (event) => event.id.toString() === values.id.toString(),
      )[0];
      WMKBackend.post('/logs/add', {
        userId: cookies.userId,
        eventId: selectedUserEvent.id,
        logStart: values.startTime,
        logEnd: values.endTime,
        totalHours: values.totalHours,
        additionalNotes: values.additionalNotes,
      }).then(() => {
        setIsModalOpen(false);
        dispatch(fetchUnsubmittedEvents());
        dispatch(createAlert({
          message: `Successfully submitted hours for ${values.title}`,
          severity: 'success',
        }));
      });
    },
    // validate only on submit, change as needed
    validateOnBlur: false,
    validateOnChange: false,
  });

  const loadUnsubmittedEvents = async () => {
    const unsubmittedHours = await WMKBackend.get('/logs/unsubmitted', {
      params: {
        userId: cookies.userId,
      },
    });
    setUnsubmittedEvents(unsubmittedHours.data.filter((e) => new Date(e.startTime) < new Date()));
  };

  useEffect(async () => {
    await loadUnsubmittedEvents();
  }, []);

  useEffect(() => {
    autofillEventInfo(eventId, userEvents, formik);
  }, [eventId, userEvents]);

  const truncateEventName = (eventName) => {
    let truncateName = eventName.substring(0, 30);
    truncateName += (eventName !== truncateName ? '...' : '');
    return truncateName;
  };

  const updateNewDate = (e, startOrEnd, value) => {
    const newDate = new Date(e);
    const newValue = new Date(value);
    newValue.setDate(newDate.getDate());
    newValue.setMonth(newDate.getMonth());
    newValue.setFullYear(newDate.getFullYear());
    formik.setFieldValue(startOrEnd, newValue);
  };

  return (
    <LightModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <LightModalHeader
        title="Event Information"
        onClose={() => setIsModalOpen(false)}
      />
      <form onSubmit={formik.handleSubmit}>
        <LightModalBody>

          <ValidatedField name="name" labelText="Name" formik={formik}>
            <input
              id="name"
              name="name"
              type="text"
              className="form-input-color view-mode-input-color"
              onChange={formik.handleChange}
              value={formik.values.name}
              readOnly
            />
          </ValidatedField>

          <ValidatedField name="title" labelText="Title of Event" formik={formik}>
            <select
              id="title"
              name="Title of Event"
              value={formik.values.title}
              onChange={async (e) => {
                const { selectedIndex } = e.target.options;
                autofillEventInfo(e.target.options[selectedIndex].getAttribute('id'), unsubmittedEvents, formik);
              }}
              className="form-input-color"
            >
              <option value="">{unsubmittedEvents.length !== 0 ? ' ' : 'No hours to log yet.'}</option>
              {unsubmittedEvents.map((event) => (
                <option
                  key={event.id}
                  value={event.title}
                  id={event.id}
                >
                  {truncateEventName(event.title)}
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
              onChange={formik.handleChange}
              value={formik.values.type}
              readOnly
            />
          </ValidatedField>

          <ValidatedField name="division" labelText="Division" formik={formik}>
            <select
              id="division"
              name="division"
              value={formik.values.division}
              onChange={formik.handleChange}
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
              onChange={formik.handleChange}
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
                onChange={(e) => updateNewDate(e, 'startTime', formik.values.startTime)}
                value={formik.values.startTime}
                inputProps={{ className: 'form-input-color datetime-input' }}
                timeFormat={false}
                required
              />
              <Datetime
                id="startTime"
                name="startTime"
                initialValue={new Date()}
                onChange={(e) => formik.setFieldValue('startTime', new Date(e))}
                value={formik.values.startTime}
                dateFormat={false}
                required
              />
            </ValidatedField>
            <p className="datetime-input-separator">to</p>
            <div className="date-picker-right">
              <ValidatedField name="endTime" labelText="End" isRequired formik={formik}>
                <Datetime
                  id="endTime"
                  name="endTime"
                  initialValue={new Date()}
                  onChange={(e) => updateNewDate(e, 'endTime', formik.values.endTime)}
                  value={formik.values.endTime}
                  inputProps={{ className: 'form-input-color datetime-input' }}
                  timeFormat={false}
                  required
                />
                <Datetime
                  id="endTime"
                  name="endTime"
                  initialValue={new Date()}
                  onChange={(e) => formik.setFieldValue('endTime', new Date(e))}
                  value={formik.values.endTime}
                  dateFormat={false}
                  required
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
              onChange={formik.handleChange}
              value={formik.values.totalHours}
            />
          </ValidatedField>

          <ValidatedField name="additionalNotes" labelText="Additional Notes (Optional)" formik={formik}>
            <TextArea
              id="additionalNotes"
              name="additionalNotes"
              onChange={formik.handleChange}
              value={formik.values.additionalNotes}
            />
          </ValidatedField>

          <div className="checkbox-section">
            <div className="checkbox-container">
              <Checkbox
                checked={formik.values.checked}
                onChange={(value) => formik.setFieldValue('checked', value)}
                id="checked"
                name="checked"
                icon={<Icon.ImCheckmark color="#003E53" />}
                borderRadius={3}
                borderColor="black"
                style={{
                  backgroundColor: 'white',
                  border: 'solid 0.5px var(--color-dark-blue)',
                }}
              />
              <p className="log-attest bold">I attest that the hours I am reporting are accurate and true</p>
            </div>
            {formik.errors.checked && formik.touched.checked ? (
              <div className="formik-field-error-text">{formik.errors.checked}</div>) : null}
          </div>

          <br />

          {unsubmittedEvents.length !== 0
            && (
            <LightModalButton primary type="submit">
              Submit
            </LightModalButton>
            )}
          <LightModalButton type="button" secondaryOutline onClick={() => setIsModalOpen(false)}>
            Cancel
          </LightModalButton>
        </LightModalBody>
      </form>
    </LightModal>
  );
};

SubmitHoursPopup.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  eventId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default SubmitHoursPopup;
