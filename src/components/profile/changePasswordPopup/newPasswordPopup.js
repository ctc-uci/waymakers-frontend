/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-useless-escape */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
import './newPasswordPopup.css';
import GoogleAuthService from '../../../services/firebase/firebase';
import { createAlert } from '../../../common/AlertBanner/AlertBannerSlice';
import { logout } from '../../../common/utils';

const strongPassRE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\]\{\}\;\'\:\"\,\.\/\<\>\?\|\\])(?=.{8,})/;
// Using Yup to do schema validation
const NewPasswordPopupSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('')
    .matches(
      strongPassRE,
      'Password must contain at least one:\nlowercase letter,\none uppercase letter,\none numeric digit,\none special character,\nand be at least 8 characters long.',
    ),
  confirmNewPassword: Yup.string()
    .required('')
    .test(
      'match',
      'Passwords do not match',
      function (value) {
        return value === this.parent.newPassword;
      },
    ),
});

const NewPasswordPopup = ({ isModalOpen, setIsModalOpen }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleLogout() {
    try {
      // setOpen(false);
      await logout();
      // Sign-out successful
    } catch (err) {
      console.log('Logout failed', err);
    }
  }

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: NewPasswordPopupSchema,
    onSubmit: async (values) => {
      const user = await GoogleAuthService.auth.currentUser;
      try {
        await user.updatePassword(values.newPassword);
        setIsModalOpen(false);
        // reset state for when popup opened again
        formik.setFieldValue('newPassword', '');
        formik.setFieldValue('confirmNewPassword', '');
        setShowPassword(false);
        setShowConfirmPassword(false);
        setShowErrorMessage(false);
        dispatch(createAlert({
          message: 'Password Successfully Changed',
          severity: 'success',
        }));
        handleLogout();
      } catch (e) {
        setShowErrorMessage(true);
        setErrorMessage(e.message);
      }
    },
    // validate only on submit, change as needed
    validateOnBlur: false,
    validateOnChange: false,
  });

  const closePopup = () => {
    formik.setFieldValue('newPassword', '');
    formik.setFieldValue('confirmNewPassword', '');
    formik.touched.confirmNewPassword = false;
    formik.touched.newPassword = false;
    setShowPassword(false);
    setShowConfirmPassword(false);
    setIsModalOpen(false);
    setShowErrorMessage(false);
    setShowPassword(false);
  };

  const renderWeakPasswordError = (error) => {
    if (error != null) {
      return (
        <p className="weak-password-error">Password must contain at least one lowercase letter,
          one uppercase letter, one numeric digit, one special
          character, and be at least 8 characters long.
        </p>
      );
    }
    return null;
  };

  return (
    <LightModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <LightModalHeader title="Change Password" onClose={() => closePopup()} />
      <form onSubmit={formik.handleSubmit}>
        <LightModalBody>
          <div className="new-password-input-section">
            <p className="new-password-details">Please enter a new password</p>
            <p className="new-password-input-header">New Password</p>
            <div className="new-password-input">
              <input
                id="new-password"
                name="newPassword"
                type={showPassword ? 'text' : 'password'}
                onChange={formik.handleChange}
                value={formik.values.newPassword}
                required
              />
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
          </div>
          <div className="new-password-input-section">
            <p className="new-password-input-header">Confirm Password</p>
            <div className="new-password-input">
              <input
                id="confirm-password"
                name="confirmNewPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                onChange={formik.handleChange}
                value={formik.values.confirmNewPassword}
                required
              />
              <button
                type="button"
                className="show-hide-button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword
                  ? <img src={hidePasswordIcon} alt="Hide" />
                  : <img src={showPasswordIcon} alt="Show" />}
              </button>
            </div>
            {formik.errors.confirmNewPassword && formik.touched.confirmNewPassword ? (
              <div className="incorrect-password-section">
                <Icon.IoIosInformationCircle color="var(--color-dark-cyan)" size={20} />
                <p className="incorrect-pass-error-message">{formik.errors.confirmNewPassword}</p>
              </div>
            ) : null}
            {formik.errors.newPassword && formik.touched.newPassword ? (
              <div className="incorrect-password-section">
                <Icon.IoIosInformationCircle color="var(--color-dark-cyan)" size={20} />
                <p className="incorrect-pass-error-message">{renderWeakPasswordError(formik.errors.newPassword)}</p>
              </div>
            ) : null}
            {showErrorMessage && (
              <div className="incorrect-password-section">
                <p className="incorrect-pass-error-message">{errorMessage}</p>
              </div>
            )}
          </div>
          <div className="popup-spacer"> </div>
          <LightModalButton primary type="submit">
            Save Changes
          </LightModalButton>
        </LightModalBody>
      </form>
    </LightModal>
  );
};

NewPasswordPopup.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};

export default NewPasswordPopup;
