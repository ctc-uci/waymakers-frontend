import React from 'react';
import Modal from 'react-modal';
import { instanceOf, PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';

import GoogleAuthService from '../../../services/firebase/firebase';
import { WMKBackend } from '../../../common/utils';

import './deleteAccountModal.css';

const DeleteAccountModal = ({ isModalOpen, setIsModalOpen, cookies }) => {
  const history = useHistory();

  const deleteAccount = async () => {
    try {
      const userID = cookies.get('userId');
      const user = GoogleAuthService.auth.currentUser;
      user.delete();
      await WMKBackend.delete(`/accounts/${userID}`);
      console.log('Account deleted!');

      // Removing session cookie
      cookies.remove('accessToken');
      cookies.remove('userId');
      cookies.remove('userPermissions');

      history.push('/login');
    } catch (err) {
      console.log(err);
      console.log('Delete account failed');
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      overlayClassName="delete-account-modal-overlay"
      className="modal"
    >
      <div className="delete-account-modal-container">
        <button type="button" className="delete-modal-close-button" onClick={() => setIsModalOpen(false)}>X</button>
        <p className="large title bold">Are you sure you want to delete your account?</p>
        <p className="body medium bold">Warning: This cannot be undone.</p>
        <button type="button" className="delete-account-button" onClick={() => deleteAccount()}>Delete Account</button>
        <button type="button" className="close-delete-account-button" onClick={() => setIsModalOpen(false)}>Cancel</button>
      </div>
    </Modal>
  );
};

DeleteAccountModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(DeleteAccountModal);
