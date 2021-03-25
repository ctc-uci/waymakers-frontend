import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css'; // TODO: REMOVE
import './qualifications.css';

function Qualification({ qualifications, isEditing }) {
  const rows = qualifications.map((task) => (
    <tr>
      <td>{task.qualification_name ? task.qualification_name : ''}</td>
      <td>
        <button type="button" className={isEditing ? 'updateBtn btn btn-secondary btn-sm rounded-pill' : 'updateBtn btn btn-success btn-sm rounded-pill'} disabled={isEditing}>Update</button>
        {' '}
      </td>
      <td>{task.completion_timestamp ? task.completion_timestamp.substring(0, 10) : ''}</td>
      <td>{task.completion_status ? task.completion_status : ''}</td>
      <td>{task.notes ? task.notes : ''}</td>
    </tr>
  ));

  return (
    <div id="qual">
      <div className="d-flex flex-row justify-content-between align-items-center">
        <h3 className="p-2">Qualifications Required</h3>
        <button type="button" className="btn btn-success rounded-circle">?</button>
      </div>
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
