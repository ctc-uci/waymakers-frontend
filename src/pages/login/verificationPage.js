import React from 'react';
import PropTypes from 'prop-types';

import { WMKBackend } from '../../common/utils';

import WMKLogo from '../../assets/wmklogodark.svg';

import './verificationPage.css';

const VerificationPage = (props) => {
  console.log('resend verification email', props);
  const {
    location: {
      state: {
        userID,
        firstName,
        email,
      },
    },
  } = props;
  const handleResendVerificationEmail = async (e) => {
    e.preventDefault();
    try {
      await WMKBackend.post('/register/sendVerification', {
        userID,
        firstName,
        email,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="verification-container">
      <img src={WMKLogo} className="wmk-verification-logo" alt="Waymakers" />
      <h1>Thank You For Signing Up!</h1>
      <p className="medium">
        A verification email has been sent to your email account.
        Please check your inbox to verify.
      </p>
      <button type="button" className="resend-button" onClick={handleResendVerificationEmail}>
        <p className="medium">Resend Verification Email</p>
      </button>
      <p className="small verify-footnote">
        *Tip:
        <br />
        Please check your inbox. If you have not received an email after 15 minutes, check your Spam
        or Trash folder or resend the verification email. For any further issues, please contact us
        at XXX@gmail.com.
      </p>
    </div>
  );
};

VerificationPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      userID: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default VerificationPage;
