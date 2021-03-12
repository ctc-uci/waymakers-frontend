/* eslint-disable max-len */
import React, { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import './QualificationsList.css';

import profCircle from '../../../images/profCircle.png';

const QualificationsList = ({
  volunteers, qualifications, title, buttonText,
}) => {
  const [qualModalIsOpen, setQualModalIsOpen] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [notesModal, setNotesModal] = useState(false);
  // const [name, setName] = useState('');

  const rows = volunteers.map((volunteer) => (
    <tr>
      <td>
        <div>
          <span className="circle" />
          <div className="volunteer">{volunteer.firstname.concat(' ').concat(volunteer.lastname)}</div>
        </div>
      </td>
      <td>
        <button className="green-button" type="button" onClick={() => setQualModalIsOpen(true)}>{buttonText}</button>
        {' '}
      </td>
    </tr>
  ));

  // for table inside qualification modal
  const popupRows = qualifications.map((qualification) => (
    <tr>
      {/* currently creating an empty row when condition not met */}
      <td className="qual-name">{qualification.completion_status === 'Not Qualified' || qualification.completion_status === 'Pending' ? qualification.qualification_name : '' }</td>
      <td>
        <button type="button" className="reject" onClick={() => setRejectModal(true)}>Reject</button>
        <button type="button" className="approve" onClick={() => setApproveModal(true)}>Approve</button>
      </td>
    </tr>
  ));

  // closes Reject Qualifications? Modal
  // opens notes modal
  const onClickRejectBtn = () => {
    setRejectModal(false);
    setNotesModal(true);
  };

  return (
    <div id="qualifications-list">
      <div id="table-header">
        <h3 className="title"><b>{title}</b></h3>
      </div>
      <div id="table-wrapper">
        <table className="qualifications-table">
          <thead>
            <tr>
              <th>Name</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
        <b>
          Total People:
          {' '}
          {Object.keys(volunteers).length}
        </b>

      </div>

      {title === 'List of Volunteers Who Need Qualifications Reviewed'
        ? (
          <Modal
            isOpen={qualModalIsOpen}
            onRequestClose={() => setQualModalIsOpen(false)}
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
        ) : <p> </p> }
      <Modal isOpen={rejectModal} onRequestClose={() => setRejectModal(false)}>
        <h6>Reject Qualification?</h6>
        <section>
          <button type="button" className="cancel-btn" onClick={() => setRejectModal(false)}>Cancel</button>
          <button type="button" className="yes-btn" onClick={onClickRejectBtn}>Yes</button>
        </section>
      </Modal>
      <Modal isOpen={approveModal} onRequestClose={() => setApproveModal(false)}>
        <h6>Approve Qualification?</h6>
        <section>
          <button type="button" className="cancel-btn" onClick={() => setApproveModal(false)}>Cancel</button>
          {/* should update qualifications approved in database */}
          <button type="button" className="yes-btn" onClick={() => setApproveModal(false)}>Yes</button>
        </section>
      </Modal>
      <Modal isOpen={notesModal} onRequestClose={() => setNotesModal(false)}>
        <h6>Please enter any additional notes for the volunteer</h6>
        <input type="text" />
        <button type="button" className="cancel-btn" onClick={() => setNotesModal(false)}>Cancel</button>
        {/* should update database with notes */}
        <button type="button" className="submit-btn" onClick={() => setNotesModal(false)}>Submit</button>
      </Modal>
    </div>
  );
};

QualificationsList.propTypes = {
  volunteers: PropTypes.arrayOf(Object).isRequired,
  qualifications: PropTypes.arrayOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

Modal.setAppElement('#root');

export default QualificationsList;
