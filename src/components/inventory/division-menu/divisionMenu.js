import React, { useState } from 'react';
import { connect } from 'react-redux';
import WarehouseMenu from './warehouseMenu';

import store from '../redux/store';
import { changeSelectedDivision } from '../redux/actions';
import { getDivisions, getSelectedDivisionID, getWarehouses } from '../redux/selectors';

import './divisionMenu.css';

const DivisionMenu = (prop) => {
  const [currentDivision, setCurrentDiviosn] = useState('All Divisions');
  const [open, setOpen] = useState(false);

  const handleArrowClick = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleDivisionClick = (e, divName) => {
    store.dispatch(changeSelectedDivision(parseInt(e.target.value, 10)));
    setCurrentDiviosn(divName);
    setOpen(false);
  };

  const menu = (list) => (
    <div>
      <div
        name="category"
        className="division-menu--list"
        value={prop.selectedDivision}
      >
        {/* Creating dropdown menu items from divisions list */}
        {/* division.div_name is displayed, but the value of the option will be the ID */}
        {Object.entries(list)
          .sort((a, b) => (a.id > b.id ? 1 : -1))
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
      <div className="division-menu-container">
        <div className="division-menu--top">
          {currentDivision}
          <button
            type="button"
            aria-label="arrow"
            onClick={handleArrowClick}
            className={open ? 'division-menu--close' : 'division-menu--open'}
          />
        </div>
        {open && menu(prop.divisionList)}
      </div>
      <WarehouseMenu warehouseList={prop.warehouseList} />
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
