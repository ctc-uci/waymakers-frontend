import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

function Qualification({ complete, incomplete }) {
  const rows = complete.map((task) => (
    <tr>
      <td>{task.question}</td>
      <td>{task.response}</td>
      <td>{task.date}</td>
      <td>{task.status}</td>
    </tr>
  ));

  const qualifications = incomplete.map((fileName) => (
    <section className="container">
      <p>
        {fileName}
        <button type="button" className="btn btn-success">Upload File</button>
      </p>
    </section>
  ));

  return (
    <div>
      <h1>Qualifications</h1>
      <section>
        <h2>Incomplete Qualifications</h2>
        <div>
          {qualifications}
        </div>
        <button type="button" className="btn btn-success">Submit Qualifications</button>
      </section>
      <section>
        <h2>Complete Qualifications</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Response</th>
              <th>Date Added</th>
              <th>Status</th>
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
  complete: PropTypes.arrayOf(Object).isRequired,
  incomplete: PropTypes.arrayOf(String).isRequired,
};

export default Qualification;
