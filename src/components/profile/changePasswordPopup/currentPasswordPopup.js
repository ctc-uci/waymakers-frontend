/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  useFormik,
} from 'formik';
import * as Yup from 'yup';
import * as Icon from 'react-icons/io';
import {
  LightModal, LightModalHeader, LightModalBody, LightModalButton,
} from '../../../common/LightModal';
import showPasswordIcon from '../../../assets/registrationShowPassword.svg';
import hidePasswordIcon from '../../../assets/registrationHidePassword.svg';
import './currentPasswordPopup.css';
import GoogleAuthService from '../../../services/firebase/firebase';

// Using Yup to do schema validation
const CurrentPasswordPopupSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required(''),
});

const CurrentPasswordPopup = ({ isModalOpen, setIsModalOpen, setIsNewPasswordModalOpen }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
    },
    validationSchema: CurrentPasswordPopupSchema,
    onSubmit: async (values) => {
      const user = await GoogleAuthService.auth.currentUser;
      const credential = GoogleAuthService.firebase.auth.EmailAuthProvider.credential(
        user.email,
        values.currentPassword,
      );
      try {
        await user.reauthenticateWithCredential(credential);
        formik.setFieldValue('currentPassword', '');
        setIsModalOpen(false);
        setShowErrorMessage(false);
        setShowPassword(false);
        setIsNewPasswordModalOpen(true);
      } catch (e) {
        setShowErrorMessage(true);
      }
    },
    // validate only on submit, change as needed
    validateOnBlur: false,
    validateOnChange: false,
  });

  // Refresh fields
  const closePopup = () => {
    formik.setFieldValue('currentPassword', '');
    setIsModalOpen(false);
    setShowErrorMessage(false);
    setShowPassword(false);
  };

  return (
    <LightModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <LightModalHeader title="Change Password" onClose={() => closePopup()} />
      <form onSubmit={formik.handleSubmit}>
        <LightModalBody>
          <div className="current-password-input-section">
            <p className="current-password-details">Please enter your current password to change your log in information.</p>
            <p className="current-password-input-header">Current Password</p>
            <div className="current-password-input">
              <input
                id="current-password"
                name="currentPassword"
                type={showPassword ? 'text' : 'password'}
                onChange={formik.handleChange}
                value={formik.values.currentPassword}
                required
              />
              {formik.errors.currentPassword && formik.touched.currentPassword ? (
                <div>{formik.errors.currentPassword}</div>
              ) : null}
              <button
                type="button"
                className="show-hide-button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword
                  ? <img src={hidePasswordIcon} alt="Hide" />
                  : <img src={showPasswordIcon} alt="Show" />}
              </button>
            </div>
            {showErrorMessage && (
              <div className="incorrect-password-section">
                <Icon.IoIosInformationCircle color="var(--color-dark-cyan)" size={20} />
                <p className="incorrect-pass-error-message">Incorrect password. Please try again.</p>
              </div>
            )}
          </div>
          <a className="forgot-password-link" href="/">Forgot your password?</a>
          <LightModalButton primary type="submit">
            Next
          </LightModalButton>
        </LightModalBody>
      </form>
    </LightModal>
  );
};

CurrentPasswordPopup.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  setIsNewPasswordModalOpen: PropTypes.func.isRequired,
};

export default CurrentPasswordPopup;
