import React, { useEffect, useState } from 'react';
import { WMKBackend } from '../../../common/utils';
import { LightModal } from '../../../common/LightModal';

import './addDivision.css';

const AddDivisionButton = (divisionList) => {
  const [popup, setPopup] = useState(false);
  const [division, setDivision] = useState('');

  const allDivisions = [];

  const getAllDivisions = () => {
    Object.entries(divisionList.divisionList)
      .map(([, div]) => allDivisions.push((div.div_name).toLowerCase()));
  };

  useEffect(() => {
    getAllDivisions();
  });

  const handleOnSubmit = async () => {
    if (allDivisions.includes(division.toLowerCase())) {
      // Replace window.alert with global responsive banner
      window.alert('Cannot add duplicate divisions');
    } else if (division === '') {
      // Replace window.alert with global responsive banner
      window.alert('Divisions must have a name');
    } else {
      await WMKBackend.post('/divisions', {
        divisionLabel: division,
      });
    }
  };

  return (
    <div className="add-division-container">
      <button type="button" className="add-division" onClick={() => setPopup(true)}>+</button>
      <LightModal
        className="add-division-popup"
        isOpen={popup}
        setIsOpen={() => setPopup(false)}
      >
        <form className="add-division-form" onSubmit={handleOnSubmit}>
          <p className="large bold">Add new division?</p>
          <input
            type="text"
            className="add-division-input"
            placeholder="Division Name"
            onChange={(e) => setDivision(e.target.value)}
          />
          <div className="confirmation">
            <button type="button" className="division-form-button" onClick={() => setPopup(false)}>Close</button>
            <button type="submit" className="division-form-button submit-division">Yes</button>
          </div>
        </form>
      </LightModal>
    </div>
  );
};

export default AddDivisionButton;
