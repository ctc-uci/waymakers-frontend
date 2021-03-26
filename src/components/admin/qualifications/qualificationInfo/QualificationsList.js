/* eslint-disable max-len */
import React, { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import './QualificationsList.css';

import QualModal from './qualModal';

const QualificationsList = ({
  volunteers, title, buttonText,
}) => {
  const [qualModalIsOpen, setQualModalIsOpen] = useState(false);
  const [currUserID, setCurrUserID] = useState('');

  // Open qualification modual, and set the current user being viewed
  const openQualModual = (userID) => {
    setQualModalIsOpen(true);
    setCurrUserID(userID);
  };

  const rows = volunteers.map((volunteer) => (
    <tr>
      <td>
        <div>
          <span className="circle" />
          <div className="volunteer">{volunteer.firstname.concat(' ').concat(volunteer.lastname)}</div>
        </div>
      </td>
      <td>
        <button className="green-button" type="button" onClick={() => openQualModual(volunteer.userid)}>{buttonText}</button>
        {' '}
      </td>
    </tr>
  ));

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
      <QualModal qualModalIsOpen={qualModalIsOpen} setQualModalIsOpen={setQualModalIsOpen} userID={currUserID} />
    </div>
  );
};

QualificationsList.propTypes = {
  volunteers: PropTypes.arrayOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

Modal.setAppElement('#root');

export default QualificationsList;
