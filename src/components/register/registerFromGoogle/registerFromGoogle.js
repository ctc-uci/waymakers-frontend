/* eslint-disable no-alert */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import isDate from 'validator/lib/isDate';

import GoogleAuthService from '../../../services/firebase/firebase';
import { WMKBackend } from '../../../common/utils';

import validationSchema from '../validationSchema';
import formInitialValues from '../formInitialValues';
import registerFormModel from '../registerFormModel';

import StepOne from '../stepOne';
import StepTwo from '../stepTwo';
import StepThree from '../stepThree';

import horizontalArrow from '../../../assets/horizontalArrow.svg';

// Piggybacking off CSS from register.css;

const createUserInDB = async (userObject) => {
  try {
    const res = await WMKBackend.post('/register/create', userObject);

    return res;
  } catch (err) {
    console.log(err);
    const { email, password } = userObject;

    // since this route is called after user is created in firebase, if this
    // route errors out, that means we have to discard the created firebase object
    await GoogleAuthService.auth.signInWithEmailAndPassword(email, password);
    const userToBeTerminated = await GoogleAuthService.auth.currentUser;
    userToBeTerminated.delete();

    throw new Error(err);
  }
};

const { formId, formField } = registerFormModel;

const Register = () => {
  const history = useHistory();
  const [registerStage, setRegisterStage] = useState(1);
  const [error, setError] = useState('');
  const currentValidationSchema = validationSchema[registerStage];

  const register = async ({
    phoneNumber, address1, address2, city, state, zipcode,
    birthDay, birthMonth, birthYear, gender, genderOther, division,
  }) => {
    const dateOfBirth = `${birthYear}-${birthMonth}-${birthDay}`;

    const user = await GoogleAuthService.auth.currentUser;
    const userName = user.displayName.split(' ');

    const res = await createUserInDB({
      userID: user.uid,
      firstName: userName[0],
      lastName: userName[1] ? userName[1] : '',
      email: user.email,
      phoneNumber,
      address1,
      address2,
      city,
      state,
      zipcode,
      birthDate: dateOfBirth,
      gender: gender === 'other' ? genderOther : gender,
      division,
      verified: true,
    });

    console.log(res);

    history.push('/login');
  };

  const handleSubmit = async (values, actions) => {
    document.body.style.cursor = 'wait';
    try {
      if (registerStage === 2) {
        const dateOfBirth = `${values.birthYear}-${values.birthMonth}-${values.birthDay}`;
        if (!isDate(dateOfBirth)) {
          throw new Error('Date of Birth does not exist.');
        }

        await register(values);
      }

      setRegisterStage(registerStage + 1);
      setError('');
      actions.setTouched([]);
      actions.setSubmitting(false);
    } catch (err) {
      setError(err.message);
    } finally {
      document.body.style.cursor = '';
    }
  };

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
            <p className="medium error-message">{error}</p>
            <div className="form-navigation">
              {registerStage > 1
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
                {[1, 2].map((stage) => (
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
                    <p className="large">Sign Up</p>
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
          <strong>Cancel.</strong>
        </Link>
      </div>
    </div>
  );
};

export default Register;
