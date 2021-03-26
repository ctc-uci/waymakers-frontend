/* eslint-disable no-unused-vars */
import { React, useState } from 'react';
import PropTypes from 'prop-types';
import './qualPopup.css';
import ApproveQual from '../approve-qual/approveQual';
import RejectQual from '../reject-qual/rejectQual';

const QualPopup = ({
  trigger, setTrigger, qualifications, firstName, lastName,
}) => {
  const [approvePopup, setApprovePopup] = useState(false);
  const [rejectPopup, setRejectPopup] = useState(false);

  const rows = qualifications.map((qualification) => (
    <tr>
      <td className="qual-name">{qualification.name}</td>
      <td>
        <button type="button" onClick={() => setRejectPopup(true)} className="btn btn-danger btn-sm rounded-pill reject">Reject</button>
        <button type="button" onClick={() => setApprovePopup(true)} className="btn btn-success btn-sm rounded-pill approve">Approve</button>
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
          <ApproveQual toggle={approvePopup} setToggle={setApprovePopup} />
          <RejectQual reject={rejectPopup} setReject={setRejectPopup} />
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
