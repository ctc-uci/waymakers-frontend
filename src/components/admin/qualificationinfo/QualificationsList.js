import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './QualificationsList.css';
import QualPopup from './qual-popup/qualPopup';

const QualificationsList = ({ volunteers, title, buttonText }) => {
  const [qualPopup, setQualPopup] = useState(false);
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');

  const qualifications = [
    {
      name: 'Valid Driver\'s License',
    },
    {
      name: '8-Hour New Volunteer Orientation',
    },
  ];

  const rows = volunteers.map((volunteer) => (
    <tr>
      <td>
        <span className="circle" />
      </td>
      <td>{volunteer.name}</td>
      <td>
        <button type="button" onClick={() => setQualPopup(true)} className="updateBtn btn btn-success btn-sm rounded-pill">{buttonText}</button>
        {' '}
      </td>
    </tr>
  ));
  return (
    <div>
      <h3 className="title">{title}</h3>
      <section id="qual">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </section>
      <QualPopup trigger={qualPopup} setTrigger={setQualPopup} qualifications={qualifications} firstName="Kevin" lastName="Durant" />
    </div>
  );
};

QualificationsList.propTypes = {
  volunteers: PropTypes.arrayOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default QualificationsList;
