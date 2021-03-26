import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import axios from 'axios';

import './qualModal.css';
import profCircle from '../../../../assets/profCircle.png';
import RejectModal from './rejectModal';
import ApproveModal from './approveModal';

const QualModal = ({
  qualModalIsOpen, setQualModalIsOpen, userID,
}) => {
  // List of qualifications for the selected user
  const [userQuals, setUserQuals] = useState([]);
  // The ID of the current qualification being reviewed
  const [currentQual, setCurrentQual] = useState();
  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);

  // Set the current qualification being reviewed
  // and open the modual selected by the user (approve or reject)
  const reviewQualification = (qualificationID) => {
    setCurrentQual(qualificationID);
    // modualToOpen(true);
  };

  // Get and set the current users qualifications from the backend
  const getUserQuals = async () => {
    const fetchedQuals = await axios.get(
      `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/qualifications/user/${userID}`,
      { withCredentials: true },
    );
    setUserQuals(fetchedQuals.data);
  };

  // Creating a table of qualifications for the selected user
  const popupRows = userQuals.map((qualification) => (
    <tr>
      {/* currently creating an empty row when condition not met */}
      <td className="qual-name">{qualification.completion_status === 'Not Qualified' || qualification.completion_status === 'Pending' ? qualification.qualification_name : '' }</td>
      <td>
        <button type="button" className="reject" onClick={() => reviewQualification(qualification.id, setRejectModal(true))}>Reject</button>
        <button type="button" className="approve" onClick={() => reviewQualification(qualification.id, setApproveModal(true))}>Approve</button>
      </td>
    </tr>
  ));

  // Fetch the selected users qualifications on popup open
  useEffect(() => {
    getUserQuals();
  }, [qualModalIsOpen]);

  return (
    <div>
      <Modal
        isOpen={qualModalIsOpen}
        onRequestClose={() => {
          setQualModalIsOpen(false);
          setUserQuals([]);
        }}
      >
        <h4>Qualifications to Approve</h4>
        <img src={profCircle} alt="" width="150" height="150" />
        <button type="button" onClick={() => setQualModalIsOpen(false)} className="close-button">x</button>
        <section>
          <table className="table">
            <tbody>
              {popupRows}
            </tbody>
          </table>
        </section>
      </Modal>
      <ApproveModal
        qualificationID={currentQual}
        userID={userID}
        open={approveModal}
        setOpen={setApproveModal}
      />
      <RejectModal
        qualificationID={currentQual}
        userID={userID}
        rejectModal={rejectModal}
        setRejectModal={setRejectModal}
      />
    </div>
  );
};

QualModal.propTypes = {
  qualModalIsOpen: PropTypes.bool.isRequired,
  setQualModalIsOpen: PropTypes.bool.isRequired,
  userID: PropTypes.string.isRequired,
};

export default QualModal;
