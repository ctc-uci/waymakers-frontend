import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { WMKBackend } from '../../../common/utils';
import { LightModal } from '../../../common/LightModal';

import { createAlert } from '../../../common/AlertBanner/AlertBannerSlice';

import './addDivision.css';

const AddDivisionButton = ({ divisionList, isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const [division, setDivision] = useState('');
  const [allDivisionsLower, setAllDivisionsLower] = useState([]);

  useEffect(() => {
    if (Object.entries(divisionList).length > 0) {
      setAllDivisionsLower(Object.entries(divisionList).map((div) => (
        div[1].div_name.toLowerCase()
      )));
    }
  }, [divisionList]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(allDivisionsLower);
    console.log(WMKBackend, createAlert, dispatch, division);
    if (allDivisionsLower.includes(division.toLowerCase())) {
      // setIsOpen(false);
      dispatch(createAlert({
        message: 'Cannot add duplicate divisions!',
        severity: 'error',
      }));
    } else if (division === '') {
      // setIsOpen(false);
      dispatch(createAlert({
        message: 'Division name can\'t be empty',
        severity: 'error',
      }));
    } else {
      WMKBackend.post('/divisions', {
        divisionLabel: division,
      }).then(() => {
        setIsOpen(false);
        dispatch(createAlert({
          message: `Successfully created division '${division}'`,
          severity: 'success',
        }));
      });
    }
  };

  return (
    <div className="add-division-container">
      <button type="button" className="add-division" onClick={() => setIsOpen(true)}>+</button>
      <LightModal
        className="add-division-popup"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
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
            <button type="button" className="division-form-button" onClick={() => setIsOpen(false)}>Close</button>
            <button type="submit" className="division-form-button submit-division">Yes</button>
          </div>
        </form>
      </LightModal>
    </div>
  );
};

AddDivisionButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  divisionList: PropTypes.object.isRequired,
};

export default AddDivisionButton;
