import React from 'react';
import { PropTypes } from 'prop-types';

import RegistrationTextField from './registrationTextField';

import './stepTwo.css';

const formFieldShape = {
  phoneNumber: PropTypes.string,
  address1: PropTypes.string,
  address2: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zipcode: PropTypes.string,
};

const StepTwo = (props) => {
  const {
    formField: {
      phoneNumber,
      address1,
      address2,
      city,
      state,
      zipcode,
    },
  } = props;

  return (
    <div className="register-step-two">
      <div className="phone-number-section">
        <p className="medium">Phone Number</p>
        <RegistrationTextField name={phoneNumber.name} label={null} placeholder="i.e. 1234567890" />
      </div>
      <div className="address-section">
        <p className="medium">Address</p>
        <div className="street-form-group">
          <RegistrationTextField
            name={address1.name}
            label={address1.label}
            placeholder="i.e. 1234 Johndoe Street"
          />
          <RegistrationTextField
            name={address2.name}
            label={address2.label}
            placeholder="Apartment, Building, Unit, etc (Optional)"
          />
        </div>
        <div className="zone-form-group">
          <RegistrationTextField labelClassName="city-label label" name={city.name} label={city.label} />
          <div className="state-zipcode">
            <RegistrationTextField labelClassName="state-label label " name={state.name} label={state.label} />
            <RegistrationTextField labelClassName="zipcode-label label" name={zipcode.name} label={zipcode.label} />
          </div>
        </div>
      </div>
    </div>
  );
};

StepTwo.propTypes = {
  formField: PropTypes.objectOf(formFieldShape).isRequired,
};

export default StepTwo;
