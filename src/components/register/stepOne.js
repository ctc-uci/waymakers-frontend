import React from 'react';
import { PropTypes } from 'prop-types';

import RegistrationTextField from './registrationTextField';
import RegistrationPasswordField from './registrationPasswordField';

import './stepOne.css';

const formFieldShape = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  confirmEmail: PropTypes.string,
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
};

const StepOne = (props) => {
  const {
    formField: {
      firstName,
      lastName,
      email,
      confirmEmail,
      password,
      confirmPassword,
    },
  } = props;

  return (
    <div className="register-step-one">
      <div className="name-section">
        <p className="medium">Full Name</p>
        <div className="name-form-group">
          <RegistrationTextField
            labelClassName="name-form-label"
            name={firstName.name}
            label={firstName.label}
            placeholder="First Name"
          />
          <RegistrationTextField
            labelClassName="name-form-label"
            name={lastName.name}
            label={lastName.label}
            placeholder="Last Name"
          />
        </div>
      </div>
      <div className="email-section">
        <p className="medium">Email</p>
        <RegistrationTextField name={email.name} label={null} placeholder="ex: myname@example.com" />
        <RegistrationTextField name={confirmEmail.name} label={null} placeholder="Confirm Email" />
      </div>
      <div className="password-section">
        <p className="medium">Password</p>
        <RegistrationPasswordField
          name={password.name}
          label={null}
          placeholder="Password"
        />
        <RegistrationPasswordField
          name={confirmPassword.name}
          label={null}
          placeholder="Confirm Password"
        />
      </div>
    </div>
  );
};

StepOne.propTypes = {
  formField: PropTypes.objectOf(formFieldShape).isRequired,
};

export default StepOne;
