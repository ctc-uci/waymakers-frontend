/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import {
  useFormik,
} from 'formik';
import * as Yup from 'yup';
// import axios from 'axios';
import {
  LightModal, LightModalHeader, LightModalBody, LightModalButton,
} from '../../../common/LightModal';
import {
  ValidatedField,
} from '../../../common/formikExtensions';

// Using Yup to do schema validation
const schema = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  tier: Yup.string()
    .required('Required'),
  link: Yup.string()
    .required('Required'),
});

const AddQualificationModal = ({ isModalOpen, setIsModalOpen }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      tier: '',
      link: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // eslint-disable-next-line no-undef
      alert(JSON.stringify(values, null, 2));
    },
    // validate only on submit, change as needed
    validateOnSubmit: true,
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <LightModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <LightModalHeader title="Add Qualification Information" onClose={() => setIsModalOpen(false)} />
      <form onSubmit={formik.handleSubmit}>
        <LightModalBody>

          {/* DIY formik */}

          <ValidatedField name="name" labelText="Name" formik={formik}>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name && formik.touched.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
          </ValidatedField>
          <ValidatedField name="tier" labelText="Tier" formik={formik}>
            <select
              id="tier"
              name="tier"
              onChange={formik.handleChange}
            >
              <option value="none" selected hidden> </option>
              <option value="tier1">Tier 1</option>
              <option value="tier2">Tier 2</option>
              <option value="tier3">Tier 3</option>
            </select>
          </ValidatedField>
          {/* Using LightModalValidatedField */}
          <ValidatedField name="link" labelText="Link" formik={formik}>
            <input
              id="link"
              name="link"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.link}
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

AddQualificationModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};

export default AddQualificationModal;
