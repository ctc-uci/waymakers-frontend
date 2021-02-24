import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './qualifications.css';

function Qualification({ qualifications, isEditing }) {
  const rows = qualifications.map((task) => (
    <tr>
      <td>{task.qualification}</td>
      <td>
        <button type="button" className={isEditing ? 'btn btn-secondary btn-sm' : 'btn btn-success btn-sm'} disabled={isEditing}>Update</button>
        {' '}
      </td>
      <td>{task.date}</td>
      <td>{task.status}</td>
      <td>{task.notes}</td>
    </tr>
  ));

  return (
    <div id="qual">
      <h3>Qualifications Required</h3>
      <section>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Qualification</th>
              <th> </th>
              <th>Date Added</th>
              <th>Status</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </section>
    </div>

  );
}

Qualification.propTypes = {
  qualifications: PropTypes.arrayOf(Object).isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default Qualification;
