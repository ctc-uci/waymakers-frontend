/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';

import PropTypes from 'prop-types';
import {
  useFormik,
} from 'formik';

import { createAlert } from '../../../common/AlertBanner/AlertBannerSlice';

import {
  LightModal, LightModalHeader, LightModalBody, LightModalButton,
} from '../../../common/LightModal';
import { WMKBackend } from '../../../common/utils';

import {
  ValidatedField,
} from '../../../common/formikExtensions';
import ReactSelectStyles from '../../../common/ReactSelect/styles';
import './updateUserModal.css';

const UpdateUserModal = ({
  isModalOpen, setIsModalOpen, userInfo, divisionList,
}) => {
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState(
    {
      name: '',
      age: '',
      gender: '',
      email: '',
      phoneNumber: '',
      location: '',
      volunteerTier: '',
      division: '',
      position: '',
    },
  );

  // Using enableReinitialize to reset initialValues with useEffect
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    // validationSchema: ExampleSchema,
    onSubmit: (values) => {
      WMKBackend
        .put(
          `/accounts/adminUpdate/${userInfo.userid}`,
          {
            division: values.division,
            position: values.position,
          },
        )
        .then(() => {
          setIsModalOpen(false);
          dispatch(createAlert({
            message: `Successfully updated ${userInfo.firstname} ${userInfo.lastname}'s information!`,
            severity: 'success',
          }));
        })
        .err((error) => {
          dispatch(createAlert({
            message: JSON.stringify(error, null, 2),
            severity: 'error',
          }));
        });
    },
    // validate only on submit, change as needed
    validateOnBlur: false,
    validateOnChange: false,
  });

  useEffect(() => {
    setInitialValues(
      {
        name: `${userInfo.firstname} ${userInfo.lastname}`,
        age: userInfo.age ? userInfo.age : '',
        gender: userInfo.gender ? userInfo.gender : '',
        email: userInfo.email ? userInfo.email : '',
        phoneNumber: userInfo.phone ? userInfo.phone : '',
        location: `${userInfo.locationcity}, ${userInfo.locationstate}`,
        volunteerTier: userInfo.volunteerTier ? userInfo.volunteerTier : '',
        division: userInfo.division ? userInfo.division : '',
        position: userInfo.permissions ? userInfo.permissions : '',
      },
    );
  }, [userInfo]);

  return (
    <LightModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <LightModalHeader title="Update User Information" onClose={() => setIsModalOpen(false)} />
      <form onSubmit={formik.handleSubmit}>
        <LightModalBody>
          <ValidatedField
            name="name"
            labelText="Name"
            labelClassName="update-user-label"
            fieldClassName="update-user-field"
            formik={formik}
          >
            <input
              id="name"
              name="name"
              type="text"
              className="update-user-input"
              value={formik.values.name}
              readOnly
            />
          </ValidatedField>
          <ValidatedField
            name="age"
            labelText="Age"
            labelClassName="update-user-label"
            fieldClassName="update-user-field"
            formik={formik}
          >
            <input
              id="age"
              name="age"
              className="update-user-input"
              type="number"
              value={formik.values.age}
              readOnly
            />
          </ValidatedField>
          <ValidatedField
            name="gender"
            labelText="Gender"
            labelClassName="update-user-label"
            fieldClassName="update-user-field"
            formik={formik}
          >
            <input
              id="gender"
              name="gender"
              className="update-user-input"
              type="text"
              value={formik.values.gender}
              readOnly
            />
          </ValidatedField>
          <ValidatedField
            name="email"
            labelText="Email"
            labelClassName="update-user-label"
            fieldClassName="update-user-field"
            formik={formik}
          >
            <input
              id="email"
              name="email"
              className="update-user-input"
              type="text"
              value={formik.values.email}
              readOnly
            />
          </ValidatedField>
          <ValidatedField
            name="phoneNumber"
            labelText="Phone Number"
            labelClassName="update-user-label"
            fieldClassName="update-user-field"
            formik={formik}
          >
            <input
              id="phoneNumber"
              name="phoneNumber"
              className="update-user-input"
              type="tel"
              value={formik.values.phoneNumber}
              readOnly
            />
          </ValidatedField>
          <ValidatedField
            name="location"
            labelText="Location"
            labelClassName="update-user-label"
            fieldClassName="update-user-field"
            formik={formik}
          >
            <input
              id="location"
              name="location"
              className="update-user-input"
              type="text"
              value={formik.values.location}
              readOnly
            />
          </ValidatedField>
          <ValidatedField name="division" labelText="Division" formik={formik}>
            <Select
              id="division"
              name="division"
              type="text"
              value={{
                value: formik.values.division,
                label: divisionList && divisionList[formik.values.division] ? divisionList[formik.values.division].div_name : '',
              }}
              options={Object.entries(divisionList)
                .sort((a, b) => (a.id > b.id ? 1 : -1))
                .map(([id, division]) => ({
                  value: id,
                  label: division.div_name,
                }
                ))}
              styles={ReactSelectStyles.basicDropdownStyles}
              onChange={(e) => { formik.setFieldValue('division', e.value); }}
            />
          </ValidatedField>
          <ValidatedField name="position" labelText="Position" formik={formik}>
            <Select
              id="position"
              name="position"
              type="text"
              value={{
                value: formik.values.position,
                label: formik.values.position,
              }}
              options={[{
                value: 'Volunteer',
                label: 'Volunteer',
              }, {
                value: 'Admin',
                label: 'Admin',
              }, {
                value: 'Staff',
                label: 'Staff',
              }]}
              styles={ReactSelectStyles.basicDropdownStyles}
              onChange={(e) => formik.setFieldValue('position', e.value)}
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

UpdateUserModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  userInfo: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  divisionList: PropTypes.object.isRequired,
};

export default UpdateUserModal;
