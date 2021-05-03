/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import {
  useFormik,
} from 'formik';
import {
  LightModal, LightModalHeader, LightModalBody, LightModalButton,
} from '../../../common/LightModal';
// import * as Yup from 'yup';
import { WMKBackend, refreshPage } from '../../../common/utils';

import {
  ValidatedField,
} from '../../../common/formikExtensions';
import './updateUserModal.css';

const UpdateUserModal = ({
  isModalOpen, setIsModalOpen, userInfo, divisionList,
}) => {
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
          alert('success');
          setIsModalOpen(false);
          refreshPage();
        })
        .err((error) => alert(JSON.stringify(error, null, 2)));
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
          {/* TODO: Add dropdowns */}
          {/* volunteer tiers are deprecated */}
          {/* <ValidatedField name="volunteerTier" labelText="Volunteer Tier" formik={formik}>
            <select
              id="volunteerTier"
              name="volunteerTier"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.volunteerTier}
            >
              <option
                key="test1"
                value="test 1"
              >
                Test 1
              </option>
            </select>
          </ValidatedField> */}
          <ValidatedField name="division" labelText="Division" formik={formik}>
            <select
              id="division"
              name="division"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.division}
            >
              {Object.entries(divisionList)
                .sort((a, b) => (a.id > b.id ? 1 : -1))
                .map(([id, division]) => (
                  <option
                    key={id}
                    value={id}
                  >
                    {division.div_name}
                  </option>
                ))}
            </select>
          </ValidatedField>
          <ValidatedField name="position" labelText="Position" formik={formik}>
            <select
              id="position"
              name="position"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.position}
            >
              <option
                key="volunteer"
                value="Volunteer"
              >
                Volunteer
              </option>
              <option
                key="admin"
                value="Admin"
              >
                Admin
              </option>
              <option
                key="staff"
                value="Staff"
              >
                Staff
              </option>
            </select>
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

// // Specifies the default values for props:
// UpdateUserModal.defaultProps = {
//   divisionList: {},
//   userInfo: {},
// };

export default UpdateUserModal;
