import React, { useState, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';

import WarehouseMenu from './warehouseMenu';
import handleOutsideClick from '../../../common/handleOutsideClick';
import { changeSelectedDivision } from '../redux/actions';
import {
  getDivisions, getSelectedDivisionID, getWarehouses,
} from '../redux/selectors';

import DownwardChevron from '../../../assets/downwardchevron.svg';

import './divisionMenu.css';

const DivisionMenu = (prop) => {
  const dispatch = useDispatch();
  const [currentDivision, setCurrentDivision] = useState('All Divisions');
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Close division dropdown when user clicks outside of it
  handleOutsideClick(ref, () => {
    setOpen(false);
  });

  const handleArrowClick = () => {
    setOpen(!open);
  };

  const handleDivisionClick = (e, divName) => {
    dispatch(changeSelectedDivision(parseInt(e.target.value, 10)));
    setCurrentDivision(divName);
    setOpen(false);
  };

  const menu = (list) => (
    <div className="division-menu--list-container">
      <div
        name="category"
        className="division-menu--list"
        value={prop.selectedDivision}
      >
        {/* Creating dropdown menu items from divisions list */}
        {/* division.div_name is displayed, but the value of the option will be the ID */}
        {Object.entries(list)
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          // .filter((div) => div[1].div_name !== 'All Divisions')
          .map(([id, division]) => (
            <button
              type="button"
              key={id}
              value={id}
              className="division-menu--list-item"
              onClick={(e) => handleDivisionClick(e, division.div_name)}
            >
              {division.div_name}
            </button>
          ))}
      </div>
    </div>
  );

  return (
    <div className="menu-container">
      <div ref={ref} className="division-menu-container">
        <button type="button" className="division-menu--top" onClick={handleArrowClick}>
          {currentDivision}
          <img src={DownwardChevron} className={open ? 'division-menu--close' : 'division-menu--open'} alt="arrow" />
        </button>
        {open && menu(prop.divisionList)}
      </div>
      <WarehouseMenu
        warehouseList={prop.warehouseList}
        divisionList={prop.divisionList}
        selectedDivision={prop.selectedDivision}
      />
    </div>
  );
};

// Connecting component props to redux state
const mapStateToProps = (state) => ({
  divisionList: getDivisions(state),
  selectedDivision: getSelectedDivisionID(state),
  warehouseList: getWarehouses(state),
});

export default connect(mapStateToProps, null)(DivisionMenu);
