// import React, { useState, useRef, useEffect } from 'react';
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import AddDivisionButton from './addDivision';
import handleOutsideClick from '../../../common/handleOutsideClick';

import DownwardChevron from '../../../assets/downwardchevron.svg';

import './udDivisionMenu.css';

const DivisionMenu = ({
  divisionList,
  currentDivision,
  setCurrentDivision,
  isOpen,
  setIsOpen,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef();

  // -- Closes open modal when anywhere within the modal is clicked.
  // Modal has no app element to prevent this condition form happening --
  // Close division dropdown when user clicks outside of it
  handleOutsideClick(ref, () => {
    setDropdownOpen(false);
  });

  const handleArrowClick = () => {
    if (dropdownOpen) {
      setDropdownOpen(false);
    } else {
      setDropdownOpen(true);
    }
  };

  const handleDivisionClick = (e, divName) => {
    setDropdownOpen(false);
    setCurrentDivision(divName);
  };

  const menu = () => (
    <div className="ud-division-menu-list-container">
      <div
        name="category"
        className="ud-division-menu--list"
        value={currentDivision}
      >
        <button
          type="button"
          key={0}
          value={0}
          className="ud-division-menu--list-item static"
          onClick={(e) => handleDivisionClick(e, 'All Divisions')}
        >
          All Divisions
        </button>
        {/* Creating dropdown menu items from divisions list */}
        {/* division.div_name is displayed, but the value of the option will be the ID */}
        {Object.entries(divisionList)
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .filter((div) => div[1].div_name !== 'All Divisions')
          .map(([id, division]) => (
            <button
              type="button"
              key={id}
              value={id}
              className="ud-division-menu--list-item static"
              onClick={(e) => handleDivisionClick(e, division.div_name)}
            >
              {division.div_name}
            </button>
          ))}
      </div>
    </div>
  );

  return (
    <div className="ud-division-menu-container" ref={ref}>
      <AddDivisionButton
        divisionList={divisionList}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <button type="button" className="ud-division-menu--top" onClick={handleArrowClick}>
        {currentDivision}
        <img src={DownwardChevron} className={dropdownOpen ? 'ud-division-menu--close' : 'ud-division-menu--open'} alt="arrow" />
      </button>
      {dropdownOpen && menu()}
    </div>
  );
};

DivisionMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  divisionList: PropTypes.object.isRequired,
  currentDivision: PropTypes.string.isRequired,
  setCurrentDivision: PropTypes.func.isRequired,
};

export default DivisionMenu;
