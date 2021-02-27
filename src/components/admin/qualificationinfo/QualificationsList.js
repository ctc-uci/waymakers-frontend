import React from 'react';
import PropTypes from 'prop-types';
import './QualificationsList.css';

const QualificationsList = ({ volunteers, title, buttonText }) => {
  const rows = volunteers.map((volunteer) => (
    <tr>
      <td>
        <span className="circle" />
      </td>
      <td>{volunteer.name}</td>
      <td>
        <button type="button" className="updateBtn btn btn-success btn-sm rounded-pill">{buttonText}</button>
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
    </div>
  );
};

QualificationsList.propTypes = {
  volunteers: PropTypes.arrayOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default QualificationsList;
