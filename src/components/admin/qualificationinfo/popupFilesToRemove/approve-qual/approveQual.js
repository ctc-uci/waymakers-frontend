import React from 'react';
import PropTypes from 'prop-types';
import './approveQual.css';

const ApproveQual = ({
  toggle, setToggle,
}) => {
  if (toggle) {
    return (
      <div className="approvePopup">
        <div className="approvePopup-inner">
          <h6 className="popup-question">Approve Qualification?</h6>
          <section>
            <button type="button" onClick={() => setToggle(false)} className="cancel-btn btn btn-sm btn-danger rounded-pill">Cancel</button>
            <button type="button" onClick={() => setToggle(false)} className="yes-btn btn btn-sm btn-success rounded-pill">Yes</button>
          </section>
        </div>
      </div>
    );
  }
  return (
    <p />
  );
};

ApproveQual.propTypes = {
  toggle: PropTypes.bool.isRequired,
  setToggle: PropTypes.bool.isRequired,
};

export default ApproveQual;
