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
import { fetchUnsubmittedEvents, fetchSubmittedEvents } from '../../../events/redux/actions';

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
const autofillEventInfo = (
  eventId,
  userEvents,
  formik,
  additionalNotes,
  logStart,
  logEnd,
  type,
) => {
  // No op on default empty option
  if (!eventId) { return; }

  // No op with no userEvents
  if (!userEvents || userEvents.length === 0) { return; }
  // No op with no formik
  if (!formik) { return; }
  const selectedUserEvent = userEvents
    .filter((e) => e.id.toString() === eventId.toString())[0];

  const start = (type === 'resubmit') ? logStart : selectedUserEvent.startTime;
  const end = (type === 'resubmit') ? logEnd : selectedUserEvent.endTime;

  formik.setFieldValue('id', selectedUserEvent.id);
  formik.setFieldValue('type', selectedUserEvent.eventType);
  formik.setFieldValue('title', selectedUserEvent.title);
  formik.setFieldValue('location', selectedUserEvent.location);
  formik.setFieldValue('startTime', new Date(start));
  formik.setFieldValue('endTime', new Date(end));
  formik.setFieldValue('division', selectedUserEvent.division);
  formik.setFieldValue('totalHours', Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60)));
  formik.setFieldValue('additionalNotes', additionalNotes);
};

// TODO: Loading state
const SubmitHoursPopup = (
  {
    isModalOpen,
    setIsModalOpen,
    eventId = '',
    type,
    additionalNotes,
    logStart,
    logEnd,
  },
) => {
  const dispatch = useDispatch();
  const [divisions] = useDivisions();
  const [userEvents] = useUserEvents();
  const [events, setEvents] = useState([]);
  const [cookies] = useCookies(['userId']);

  const getEventId = (event) => {
    console.log(event);
    if (type === 'submit') {
      return event.id;
    }
    return event.eventId;
  };

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
      const selectedUserEvent = events.filter(
        (event) => getEventId(event).toString() === values.id.toString(),
      )[0];
      if (type === 'submit') {
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
        })
          .catch(() => {
            dispatch(createAlert({
              message: `Failed to submit hours for ${values.title}`,
              severity: 'error',
            }));
          });
      } else {
        WMKBackend.put('/logs/update', {
          userId: cookies.userId,
          eventId: getEventId(selectedUserEvent),
          logStart: values.startTime,
          logEnd: values.endTime,
          totalHours: values.totalHours,
          additionalNotes: values.additionalNotes,
        }).then(() => {
          setIsModalOpen(false);
          dispatch(fetchSubmittedEvents());
          dispatch(createAlert({
            message: `Successfully resubmitted hours for ${values.title}`,
            severity: 'success',
          }));
        }).catch(() => {
          dispatch(createAlert({
            message: `Failed to resubmit hours for ${values.title}`,
            severity: 'error',
          }));
        });
      }
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
    setEvents(unsubmittedHours.data.filter((e) => new Date(e.startTime) < new Date()));
  };

  const loadSubmittedEvents = async () => {
    const submittedHours = await WMKBackend.get('/logs/submitted', {
      params: {
        userId: cookies.userId,
      },
    });
    setEvents(submittedHours.data);
  };

  useEffect(async () => {
    if (type === 'submit') {
      await loadUnsubmittedEvents();
    } else {
      await loadSubmittedEvents();
    }
  }, []);

  useEffect(() => {
    autofillEventInfo(eventId,
      userEvents,
      formik,
      additionalNotes,
      logStart,
      logEnd,
      type);
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
    if (startOrEnd === 'startTime') {
      formik.setFieldValue('totalHours', Math.ceil((new Date(formik.values.endTime) - new Date(newValue)) / (1000 * 60 * 60)));
    } else {
      formik.setFieldValue('totalHours', Math.ceil((new Date(newValue) - new Date(formik.values.startTime)) / (1000 * 60 * 60)));
    }
  };

  const updateNewTime = (e, startOrEnd) => {
    const newDate = new Date(e);
    formik.setFieldValue(startOrEnd, newDate);
    if (startOrEnd === 'startTime') {
      formik.setFieldValue('totalHours', Math.ceil((new Date(formik.values.endTime) - new Date(newDate)) / (1000 * 60 * 60)));
    } else {
      formik.setFieldValue('totalHours', Math.ceil((new Date(newDate) - new Date(formik.values.startTime)) / (1000 * 60 * 60)));
    }
  };

  console.log(eventId);
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
                autofillEventInfo(e.target.options[selectedIndex].getAttribute('id'), events, formik);
              }}
              className={`form-input-color ${(eventId !== '') ? 'view-mode-input-color' : ''}`}
              disabled={eventId !== ''}
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
                inputProps={{ className: 'datetime-input form-input-color' }}
                timeFormat={false}
                required
              />
              <Datetime
                id="startTime"
                name="startTime"
                initialValue={new Date()}
                onChange={(e) => updateNewTime(e, 'startTime')}
                value={formik.values.startTime}
                dateFormat={false}
                required
                inputProps={{ className: 'datetime-input form-input-color' }}
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
                  inputProps={{ className: 'datetime-input form-input-color' }}
                  timeFormat={false}
                  required
                />
                <Datetime
                  id="endTime"
                  name="endTime"
                  initialValue={new Date()}
                  onChange={(e) => updateNewTime(e, 'endTime')}
                  value={formik.values.endTime}
                  dateFormat={false}
                  inputProps={{ className: 'datetime-input form-input-color' }}
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
              readOnly
            />
          </ValidatedField>

          <ValidatedField name="additionalNotes" labelText="Additional Notes (Optional)" formik={formik}>
            <TextArea
              id="additionalNotes"
              name="additionalNotes"
              onChange={formik.handleChange}
              value={formik.values.additionalNotes || ''}
              className="form-input-color"
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
          {events.length !== 0 && (
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

SubmitHoursPopup.defaultProps = {
  additionalNotes: '',
  logStart: new Date(),
  logEnd: new Date(),
};

SubmitHoursPopup.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  eventId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  type: PropTypes.string.isRequired,
  additionalNotes: PropTypes.string,
  logStart: PropTypes.string,
  logEnd: PropTypes.string,
};

export default SubmitHoursPopup;
