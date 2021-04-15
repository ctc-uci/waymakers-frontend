import React from 'react';
import { PropTypes } from 'prop-types';
import { useFormikContext } from 'formik';

import RegistrationTextField from './registrationTextField';

import registrationError from '../../assets/registrationError.svg';

import './stepThree.css';

const formFieldShape = {
  birthMonth: PropTypes.string,
  birthDay: PropTypes.string,
  birthYear: PropTypes.string,
  gender: PropTypes.string,
  genderOther: PropTypes.string,
};

const StepThree = (props) => {
  const {
    formField: {
      birthMonth,
      birthDay,
      birthYear,
      gender,
      genderOther,
    },
  } = props;

  const meta = useFormikContext();

  return (
    <div className="register-step-three">
      <div className="birthday-section">
        <div className="birthday-section">
          <p className="medium">Date of Birth</p>
          <div className="birthday-form-group">
            <RegistrationTextField labelClassName="birthday-label" name={birthMonth.name} label={birthMonth.label} />
            <RegistrationTextField labelClassName="birthday-label" name={birthDay.name} label={birthDay.label} />
            <RegistrationTextField labelClassName="birthday-label" name={birthYear.name} label={birthYear.label} />
          </div>
        </div>
      </div>
      <div className="gender-section">
        <p className="medium">Gender</p>
        <div className="gender-form-group">
          <select
            className="gender-dropdown"
            name={gender.name}
            onChange={meta.handleChange}
          >
            <option value="" disabled selected hidden>Specify Gender</option>
            <option className="gender-option" value="male" label="Male" />
            <option className="gender-option" value="female" label="Female" />
            <option className="gender-option" value="nonbinary" label="Nonbinary" />
            <option className="gender-option" value="genderfluid" label="Genderfluid" />
            <option className="gender-option" value="genderqueer" label="Genderqueer" />
            <option className="gender-option" value="agender" label="Agender" />
            <option className="gender-option" value="gnc" label="Gender Non-Conforming" />
            <option className="gender-option" value="other" label="Other" />
            <option className="gender-option" value="pfts" label="Prefer Not To Say" />
          </select>
          {meta.touched.gender && meta.errors.gender ? (
            <p className="dropdown-error">
              <img src={registrationError} alt=" " />
              {' '}
              {meta.errors.gender}
            </p>
          ) : <br />}
          <RegistrationTextField
            name={genderOther.name}
            label={null}
            labelClassName="gender-other"
            placeholder="Specify Gender If Other"
          />
        </div>
      </div>
    </div>
  );
};

StepThree.propTypes = {
  formField: PropTypes.objectOf(formFieldShape).isRequired,
};

export default StepThree;
