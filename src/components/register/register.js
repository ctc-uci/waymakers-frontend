/* eslint-disable no-alert */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';

import GoogleAuthService from '../../services/firebase/firebase';

import validationSchema from './validationSchema';
import formInitialValues from './formInitialValues';
import registerFormModel from './registerFormModel';

import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from './stepThree';

import horizontalArrow from '../../assets/horizontalArrow.svg';
import './register.css';

const axios = require('axios');

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
  withCredentials: true,
});

const { formId, formField } = registerFormModel;

function renderStepContent(step) {
  switch (step) {
    case 0:
      return <StepOne formField={formField} />;
    case 1:
      return <StepTwo formField={formField} />;
    case 2:
      return <StepThree formField={formField} />;
    default:
      return <div>Not Found</div>;
  }
}

const Register = () => {
  const history = useHistory();
  const [registerStage, setRegisterStage] = useState(0);
  const currentValidationSchema = validationSchema[registerStage];

  const register = async ({
    firstName, lastName, email, password,
    phoneNumber, address1, address2, city, state, zipcode,
    birthDay, birthMonth, birthYear, gender,
  }) => {
    try {
      const user = await GoogleAuthService.auth.createUserWithEmailAndPassword(email, password);
      console.log(user);
      const res = await instance.post('register/create', {
        userID: user.user.uid,
        firstName,
        lastName,
        email,
        phoneNumber,
        address1,
        address2,
        city,
        state,
        zipcode,
        birthDate: `${birthYear}-${birthMonth}-${birthDay}`,
        gender,
        division: 1,
      });
      console.log(res);
    } catch (err) {
      alert(err);
    }
  };

  const handleSubmit = async (values, actions) => {
    if (registerStage === 2) {
      // alert(JSON.stringify(values, null, 2));
      try {
        await register(values);
        history.push('/');
      } catch (err) {
        alert(err);
      }
    } else {
      setRegisterStage(registerStage + 1);
      actions.setTouched([]);
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <Formik
        initialValues={formInitialValues}
        validationSchema={currentValidationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form id={formId} key="register">
            {renderStepContent(registerStage)}
            <div className="form-navigation">
              {registerStage > 0
                ? (
                  <button
                    type="button"
                    className="back-button"
                    aria-label="back"
                    onClick={() => setRegisterStage(registerStage - 1)}
                  >
                    <img src={horizontalArrow} className="back-arrow" alt="back" />
                  </button>
                )
                : <div />}
              <div className="stage-dots">
                {[0, 1, 2].map((stage) => (
                  <div className={`stage-dot ${registerStage === stage ? 'current-stage' : ''}`} />
                ))}
              </div>
              {registerStage < 2
                ? (
                  <button type="submit" className="next-button" aria-label="next">
                    <img src={horizontalArrow} className="next-arrow" alt="next" />
                  </button>
                )
                : (
                  <button type="submit" className="signup-button" aria-label="submit">
                    Sign Up
                  </button>
                )}
            </div>
          </Form>
        )}
      </Formik>
      <div className="sign-in">
        Already have an account?
        {' '}
        <Link to="/login">
          <strong>Login.</strong>
        </Link>
      </div>
    </div>
  );
};

export default Register;
