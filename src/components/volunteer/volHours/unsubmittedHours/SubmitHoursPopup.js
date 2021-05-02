/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
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
import {
  refreshPage, WMKBackend,
} from '../../../../common/utils';

import useDivisions from '../useDivisions';
import useUserEvents from '../useUserEvents';

// Using Yup to do schema validation
const Schema = Yup.object().shape({
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
const autofillEventInfo = (title, userEvents, formik) => {
  // No op on default empty option
  if (title === '') { return; }

  // No op with no userEvents
  if (!userEvents || userEvents.length === 0) { return; }

  // No op with no formik
  if (!formik) { return; }

  const selectedUserEvent = userEvents.filter(
    (userEvent) => userEvent.title === title,
  )[0];

  formik.setFieldValue('type', selectedUserEvent.eventType);
  formik.setFieldValue('title', selectedUserEvent.title);
  formik.setFieldValue('location', selectedUserEvent.location);
  formik.setFieldValue('startTime', new Date(selectedUserEvent.startTime));
  formik.setFieldValue('endTime', new Date(selectedUserEvent.endTime));
  formik.setFieldValue('division', selectedUserEvent.division);
  formik.setFieldValue('totalHours', Math.ceil((new Date(selectedUserEvent.endTime) - new Date(selectedUserEvent.startTime)) / (1000 * 60 * 60)));
};

// TODO: Loading state
const SubmitHoursPopup = ({ isModalOpen, setIsModalOpen, eventTitle = '' }) => {
  const [divisions] = useDivisions();
  const [userEvents] = useUserEvents();
  const [cookies] = useCookies(['userId']);

  const formik = useFormik({
    initialValues: {
      type: '',
      title: '',
      location: '',
      startTime: new Date(),
      endTime: new Date(),
      totalHours: '',
      division: '',
      additionalNotes: '',
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      const selectedUserEvent = userEvents.filter(
        (userEvent) => userEvent.title === values.title,
      )[0];

      WMKBackend.post('/logs/add', {
        userId: cookies.userId,
        eventId: selectedUserEvent.id,
        logStart: values.startTime,
        logEnd: values.endTime,
        totalHours: values.totalHours,
        additionalNotes: values.additionalNotes,
      }).then(() => {
        // TODO: confirmation of success
        setIsModalOpen(false);
        refreshPage();
      }).error((err) => {
        // eslint-disable-next-line no-undef
        alert('error', err);
      });
    },
    // validate only on submit, change as needed
    validateOnBlur: false,
    validateOnChange: false,
  });

  useEffect(() => {
    autofillEventInfo(eventTitle, userEvents, formik);
  }, [eventTitle, userEvents]);

  return (
    <LightModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <LightModalHeader title="Submit Hours" onClose={() => setIsModalOpen(false)} />
      <form onSubmit={formik.handleSubmit}>
        <LightModalBody>

          <ValidatedField name="type" labelText="Type" formik={formik}>
            <input
              id="type"
              name="type"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.type}
            />
          </ValidatedField>

          <ValidatedField name="title" labelText="Title of Event" formik={formik}>
            <select
              id="title"
              name="Title of Event"
              value={formik.values.title}
              onChange={(e) => autofillEventInfo(e.target.value, userEvents, formik)}
            >
              <option value="">{' '}</option>
              {userEvents.map((userEvent) => (
                <option
                  key={userEvent.title}
                  value={userEvent.title}
                >
                  {userEvent.title}
                </option>
              ))}
            </select>
          </ValidatedField>

          <ValidatedField name="location" labelText="Location" formik={formik}>
            <input
              id="location"
              name="location"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.location}
            />
          </ValidatedField>

          <ValidatedField name="startTime" labelText="Start Time" formik={formik}>
            <Datetime
              value={formik.values.startTime}
              id="startTime"
              onChange={(moment) => {
                formik.setFieldValue('startTime', moment.toDate());
              }}
              required
            />
          </ValidatedField>

          <ValidatedField name="endTime" labelText="End Time" formik={formik}>
            <Datetime
              value={formik.values.endTime}
              id="endTime"
              onChange={(moment) => {
                formik.setFieldValue('endTime', moment.toDate());
              }}
              required
            />
          </ValidatedField>

          <ValidatedField name="totalHours" labelText="Total Hours" formik={formik}>
            <input
              id="totalHours"
              name="totalHours"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.totalHours}
            />
          </ValidatedField>

          <ValidatedField name="division" labelText="Division" formik={formik}>
            <select
              id="division"
              name="division"
              value={formik.values.division}
              onChange={formik.handleChange}
            >
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

          <ValidatedField name="additionalNotes" labelText="Additional Notes (Optional)" formik={formik}>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              rows="5"
              cols="25"
              style={{ resize: 'none' }}
              onChange={formik.handleChange}
              value={formik.values.additionalNotes}
            />
          </ValidatedField>

          <LightModalButton primary type="submit">
            Submit
          </LightModalButton>
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
  eventTitle: PropTypes.func.isRequired,
};

export default SubmitHoursPopup;
