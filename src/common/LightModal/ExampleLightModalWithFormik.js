/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import {
  useFormik,
} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  LightModal, LightModalHeader, LightModalBody, LightModalButton,
} from '.';
import {
  ValidatedField,
} from '../formikExtensions';
import ReactSelectStyles from '../ReactSelect/styles';

// Using Yup to do schema validation
const ExampleSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Required')
    .test('custom-test', 'Failed custom test', (value) => value === 'harrison'),
  lastName: Yup.string()
    .required('Required')
    .test('custom-test-async', 'Failed async test', async () => {
      try {
        // Should see a noticable 1 second lag in UI, proves async working
        // await new Promise((resolve) => {
        //   setTimeout(resolve, 1000);
        // });
        await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        // await axios.get('https://notrealURL.jibberish');
        return true;
      } catch (err) {
        return false;
      }
    }),
  dateTime: Yup.string() // TODO: could do better than just a string
    .required('Required'),
});

const ExampleLightModalWithFormik = ({ isModalOpen, setIsModalOpen }) => {
  /*
  Formik is lit: https://formik.org/docs/overview
  - bundles all ur form related states in one, doesn't clutter up your other useStates space
  - validation is easy -> more likely to implement it
  - very composable, opt-in to things features u want
  */

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      dateTime: '',
      test: '',
    },
    validationSchema: ExampleSchema,
    onSubmit: (values) => {
      // eslint-disable-next-line no-undef
      alert(JSON.stringify(values, null, 2));
    },
    // validate only on submit, change as needed
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <LightModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <LightModalHeader title="Example title" onClose={() => setIsModalOpen(false)} />
      <form onSubmit={formik.handleSubmit}>
        <LightModalBody>

          {/* DIY formik */}
          <p>First Name</p>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          {formik.errors.firstName && formik.touched.firstName ? (
            <div>{formik.errors.firstName}</div>
          ) : null}

          {/* Using LightModalValidatedField */}
          <ValidatedField name="lastName" labelText="Last Name" formik={formik}>
            <select>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </ValidatedField>

          {/* Using LightModalValidatedField */}
          <ValidatedField name="test" labelText="test" formik={formik}>
            <Select
              value={[{
                value: 1,
                label: 'hello world',
              }, {
                value: 2,
                label: 'hello worl2',
              }, {
                value: 3,
                label: 'hello worl3',
              }, {
                value: 4,
                label: 'hello world4',
              }].filter((e) => formik.values.test === e.value)}
              options={[{
                value: 1,
                label: 'hello world',
              }, {
                value: 2,
                label: 'hello worl2',
              }, {
                value: 3,
                label: 'hello worl3',
              }, {
                value: 4,
                label: 'hello world4',
              }]}
              styles={ReactSelectStyles.basicDropdownStyles}
              onChange={(e) => formik.setFieldValue('test', e.value)}
            />
          </ValidatedField>

          {/* Using LightModalValidatedField */}
          <ValidatedField name="lastName" labelText="Last Name" formik={formik}>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </ValidatedField>
          {/* Using LightModalValidatedField */}
          <ValidatedField name="lastName" labelText="Last Name" formik={formik}>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </ValidatedField>
          {/* Using LightModalValidatedField */}
          <ValidatedField name="lastName" labelText="Last Name" formik={formik}>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </ValidatedField>
          {/* Using LightModalValidatedField */}
          <ValidatedField name="lastName" labelText="Last Name" formik={formik}>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </ValidatedField>
          {/* Using LightModalValidatedField */}
          <ValidatedField name="lastName" labelText="Last Name" formik={formik}>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </ValidatedField>
          {/* Using LightModalValidatedField */}
          <ValidatedField name="lastName" labelText="Last Name" formik={formik}>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </ValidatedField>
          {/* Using LightModalValidatedField */}
          <ValidatedField name="lastName" labelText="Last Name" formik={formik}>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </ValidatedField>
          {/* Using LightModalValidatedField */}
          <ValidatedField name="lastName" labelText="Last Name" formik={formik}>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </ValidatedField>
          {/* Using LightModalValidatedField */}
          <ValidatedField name="lastName" labelText="Last Name" formik={formik}>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </ValidatedField>
          {/* Using LightModalValidatedField */}
          <ValidatedField name="lastName" labelText="Last Name" formik={formik}>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </ValidatedField>
          {/* Using LightModalValidatedField */}
          <ValidatedField name="lastName" labelText="Last Name" formik={formik}>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </ValidatedField>
          {/* Using LightModalValidatedField */}
          <ValidatedField name="lastName" labelText="Last Name" formik={formik}>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </ValidatedField>
          {/* Using LightModalValidatedField */}
          <ValidatedField name="lastName" labelText="Last Name" formik={formik}>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </ValidatedField>
          {/* datetime input type */}
          <ValidatedField name="dateTime" labelText="Date and Time" formik={formik}>
            <input
              id="dateTime"
              name="dateTime"
              type="dateTime-local"
              onChange={formik.handleChange}
              value={formik.values.dateTime}
            />
          </ValidatedField>

          <LightModalButton primary type="submit">
            Submit
          </LightModalButton>
          <LightModalButton type="button" secondaryOutline onClick={() => console.log('hi')}>
            Cancel
          </LightModalButton>
        </LightModalBody>
      </form>
    </LightModal>
  );
};

ExampleLightModalWithFormik.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};

export default ExampleLightModalWithFormik;
