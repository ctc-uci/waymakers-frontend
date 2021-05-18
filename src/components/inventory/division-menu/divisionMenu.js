import React, { useState, useRef, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import { createAlert } from '../../../common/AlertBanner/AlertBannerSlice';

import WarehouseMenu from './warehouseMenu/warehouseMenu';
import DivisionMenuItem from './divisionMenuItem';
import handleOutsideClick from '../../../common/handleOutsideClick';
// import { changeSelectedDivision } from '../redux/actions';
import {
  getDivisions,
  getSelectedDivisionID,
  getWarehouses,
  getSelectedDivisionLabel,
  getDeletedDivisionIDs,
} from '../redux/selectors';

import DownwardChevron from '../../../assets/downwardchevron.svg';

import './divisionMenu.css';

const DivisionMenu = (prop) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [currentDivisionDeleted, setCurrentDivisionDeleted] = useState(false);
  const ref = useRef();
  // console.log(DivisionMenuItem, setCurrentDivision);
  // Close division dropdown when user clicks outside of it
  handleOutsideClick(ref, () => {
    setOpen(false);
  });

  const handleArrowClick = () => {
    setOpen(!open);
  };

  const checkIfCurrentDivisionDeleted = () => {
    if (prop.allDeletedDivisions
      .filter((id) => id.toString() === prop.currentDivisionID.toString()).length > 0) {
      setCurrentDivisionDeleted(true);
      dispatch(createAlert({
        message: 'Changes to warehouses and items belonging to the current division won\'t be saved until the current division is undeleted!',
        severity: 'warning',
      }));
    } else {
      setCurrentDivisionDeleted(false);
    }
  };

  useEffect(() => {
    checkIfCurrentDivisionDeleted();
  }, [prop.currentDivisionID, prop.allDeletedDivisions]);

  // const handleDivisionClick = (e, divName) => {
  //   dispatch(changeSelectedDivision(parseInt(e.target.value, 10)));
  //   setCurrentDivision(divName);
  //   setOpen(false);
  // };
  const menu = (list) => (
    <div className="division-menu--list-container">
      <div
        name="category"
        className="division-menu--list"
        value={prop.currentDivisionID}
      >
        {/* Creating dropdown menu items from divisions list */}
        {/* division.div_name is displayed, but the value of the option will be the ID */}
        {Object.entries(list)
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          // .filter((div) => div[1].div_name !== 'All Divisions')
          // .filter((division) => division[1].id.toString() !== currentDivisionID.toString())
          .map(([id, division]) => (
            <DivisionMenuItem
              divisionId={id}
              divisionName={division.div_name}
              open={open}
              setOpen={setOpen}
            />
          ))}
      </div>
    </div>
  );

  return (
    <div className="menu-container">
      <div ref={ref} className="division-menu-container">
        <div className="division-menu--top">
          <DivisionMenuItem
            divisionId={prop.currentDivisionID}
            divisionName={prop.currentDivisionLabel}
            open={open}
            setOpen={setOpen}
            topLabel
          />
          <button type="button" className="division-menu-arrow" onClick={handleArrowClick}>
            <img src={DownwardChevron} className={open ? 'division-menu--close' : 'division-menu--open'} alt="arrow" />
          </button>
        </div>
        {/* <button type="button" className="division-menu--top" onClick={handleArrowClick}>
          {currentDivision.name}
          <img src={DownwardChevron} className={open ? 'division-menu--close'
          : 'division-menu--open'} alt="arrow" />
        </button> */}
        {open && menu(prop.divisionList)}
      </div>
      <WarehouseMenu
        warehouseList={prop.warehouseList}
        divisionList={prop.divisionList}
        selectedDivision={prop.currentDivisionID}
        divisionDeleted={currentDivisionDeleted}
      />
    </div>
  );
};

// Connecting component props to redux state
const mapStateToProps = (state) => ({
  divisionList: getDivisions(state),
  warehouseList: getWarehouses(state),
  currentDivisionID: getSelectedDivisionID(state),
  currentDivisionLabel: getSelectedDivisionLabel(state),
  allDeletedDivisions: getDeletedDivisionIDs(state),
});

export default connect(mapStateToProps, null)(DivisionMenu);
