import React from 'react';
import PropTypes from 'prop-types';
import './rejectQual.css';

const RejectQual = ({
  reject, setReject,
}) => {
  if (reject) {
    return (
      <div className="rejectPopup">
        <div className="rejectPopup-inner">
          <h6 className="popup-question-r">Reject Qualification?</h6>
          <section>
            <button type="button" onClick={() => setReject(false)} className="cancel-btn btn btn-sm btn-danger rounded-pill">Cancel</button>
            <button type="button" onClick={() => setReject(false)} className="yes-btn btn btn-sm btn-success rounded-pill">Yes</button>
          </section>
        </div>
      </div>
    );
  }
  return (
    <p />
  );
};

RejectQual.propTypes = {
  reject: PropTypes.bool.isRequired,
  setReject: PropTypes.bool.isRequired,
};

export default RejectQual;
