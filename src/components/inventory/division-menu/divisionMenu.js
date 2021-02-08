import React from 'react';
import { connect } from 'react-redux';
import WarehouseMenu from './warehouseMenu';

import store from '../redux/store';
import { changeSelectedDivision } from '../redux/actions';
import { getDivisions, getSelectedDivisionID, getWarehouses } from '../redux/selectors';

import './divisionMenu.css';

const DivisionMenu = (prop) => (
  <div className="menu-container">
    <div className="division-menu-container">
      <select
        name="category"
        className="division-menu"
        value={prop.selectedDivision}
        onChange={(e) => { store.dispatch(changeSelectedDivision(parseInt(e.target.value, 10))); }}
      >
        {/* Creating dropdown menu items from divisions list */}
        {/* division.div_name is displayed, but the value of the option will be the ID */}
        {Object.entries(prop.divisionList)
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map(([id, division]) => (
            <option key={id} value={id}>{division.div_name}</option>
          ))}
      </select>
    </div>
    <WarehouseMenu warehouseList={prop.warehouseList} />
  </div>
);

// Connecting component props to redux state
const mapStateToProps = (state) => ({
  divisionList: getDivisions(state),
  selectedDivision: getSelectedDivisionID(state),
  warehouseList: getWarehouses(state),
});

export default connect(mapStateToProps, null)(DivisionMenu);
