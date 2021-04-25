import React from 'react';
import Modal from 'react-modal';
import { instanceOf, PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';

import { WMKBackend } from '../../../common/utils';

import './deleteAccountModal.css';

const DeleteAccountModal = ({ isModalOpen, setIsModalOpen, cookies }) => {
  const deleteAccount = async () => {
    const userID = cookies.get('userId');
    const result = await WMKBackend.delete(`/accounts/${userID}`);
    console.log(result.status);
    console.log('account deleted!');
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
        <p className="body medium bold">This cannot be undone.</p>
        <Link to="/login">
          <button type="button" className="delete-account-button" onClick={() => deleteAccount()}>Delete Account</button>
        </Link>
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
