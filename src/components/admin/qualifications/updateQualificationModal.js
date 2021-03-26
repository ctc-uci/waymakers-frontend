/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import {
  useFormik,
} from 'formik';
import * as Yup from 'yup';
import {
  LightModal, LightModalHeader, LightModalBody, LightModalButton,
} from '../../../common/LightModal';
import {
  ValidatedField,
} from '../../../common/formikExtensions';
import { wmkAPI } from '../../../common/utils';

// Using Yup to do schema validation
const schema = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  tier: Yup.array()
    .of(Yup.number())
    .required('Required'),
  link: Yup.string()
    .required('Required'),
});

const UpdateQualificationModal = ({ isModalOpen, setIsModalOpen, qualification }) => {
  const formik = useFormik({
    initialValues: {
      name: qualification.qualification_name,
      tier: qualification.volunteer_tier,
      link: qualification.qualification_description, // TODO: need to add link to table
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      // eslint-disable-next-line no-undef
      try {
        const response = await wmkAPI.put(`/qualifications/${qualification.id}`,
          {
            name: values.name,
            description: values.link, // TODO: update
            tier: -1,
            qualificationTiers: values.tier,
          },
          { withCredentials: true });
        console.log(response);
        alert('yay');
      } catch (err) {
        // eslint-disable-next-line
        console.error(err);
      }
    },
    // validate only on submit, change as needed
    validateOnSubmit: true,
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <LightModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <LightModalHeader title="Update Qualification Information" onClose={() => setIsModalOpen(false)} />
      <form onSubmit={formik.handleSubmit}>
        <LightModalBody>

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
              value={formik.values.tier}
              multiple
            >
              <option value="none" selected hidden> </option>
              <option value="1">Tier 1</option>
              <option value="2">Tier 2</option>
              <option value="3">Tier 3</option>
            </select>
          </ValidatedField>

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

UpdateQualificationModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  qualification: PropTypes.shape({
    id: PropTypes.number,
    qualification_name: PropTypes.string,
    volunteer_tier: PropTypes.number,
    qualification_description: PropTypes.string,
  }).isRequired,
};

export default UpdateQualificationModal;
