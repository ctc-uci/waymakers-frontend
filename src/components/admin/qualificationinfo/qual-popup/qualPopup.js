/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import './qualPopup.css';

const QualPopup = ({
  trigger, setTrigger, qualifications, firstName, lastName,
}) => {
  const rows = qualifications.map((qualification) => (
    <tr>
      <td className="qual-name">{qualification.name}</td>
      <td>
        <button type="button" className="btn btn-danger btn-sm rounded-pill reject">Reject</button>
        <button type="button" className="btn btn-success btn-sm rounded-pill approve">Approve</button>
      </td>
    </tr>
  ));

  if (trigger) {
    return (
      <div className="popup">
        {/* <h4 className="popup-title">
          {firstName}
          {' '}
          {lastName}
        </h4> */}
        {/* <h4 className="popup-title">Pending Qualifications: </h4> */}
        <button type="button" onClick={() => setTrigger(false)} className="close-btn">x</button>
        <div className="popup-inner">
          <h4 className="popup-title">Qualifications to Approve</h4>
          <section>
            <table className="table">
              <tbody>
                {rows}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    );
  }
  return (
    <p />
  );
};

QualPopup.propTypes = {
  trigger: PropTypes.bool.isRequired,
  setTrigger: PropTypes.bool.isRequired,
  qualifications: PropTypes.arrayOf(Object).isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};

export default QualPopup;
