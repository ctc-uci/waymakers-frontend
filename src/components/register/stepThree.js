import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Field, useFormikContext } from 'formik';

import RegistrationTextField from './registrationTextField';
import TermsOfUseModal from './TermsOfUseModal';

import registrationError from '../../assets/registrationError.svg';

import './stepThree.css';

const formFieldShape = {
  birthMonth: PropTypes.string,
  birthDay: PropTypes.string,
  birthYear: PropTypes.string,
  gender: PropTypes.string,
  genderOther: PropTypes.string,
  termsOfUse: PropTypes.bool,
};

const StepThree = (props) => {
  const {
    formField: {
      birthMonth,
      birthDay,
      birthYear,
      gender,
      genderOther,
      termsOfUse,
    },
  } = props;

  const [isTOUModalOpen, setTOUModalOpen] = useState(false);
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
            <p className="dropdown-error small">
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
      {/* <div className="division-section">
        <p className="medium">Division</p>
        <div className="division-form-group">

        </div>
      </div> */}
      <div className="terms-section">
        <TermsOfUseModal isOpen={isTOUModalOpen} setIsOpen={setTOUModalOpen} />
        <div className="view-terms">
          <p className="medium">Terms of Use:</p>
          <button
            type="button"
            className="terms-button"
            onClick={() => setTOUModalOpen(true)}
          >
            <p className="medium">Read the data privacy agreement.</p>
          </button>
        </div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="tou-accept" htmlFor={termsOfUse.name}>
          <Field
            type="checkbox"
            className="tou-checkbox"
            id={termsOfUse.name}
            name={termsOfUse.name}
          />
          <p className="medium">I read and accept the Terms of Use</p>
        </label>
        {meta.touched.termsOfUse && meta.errors.termsOfUse ? (
          <p className="tou-error small">
            <img src={registrationError} alt=" " />
            {' '}
            {meta.errors.termsOfUse}
          </p>
        ) : <br />}
      </div>
    </div>
  );
};

StepThree.propTypes = {
  formField: PropTypes.objectOf(formFieldShape).isRequired,
};

export default StepThree;
