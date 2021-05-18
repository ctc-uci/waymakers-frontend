import React, { useState, useRef, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';

import { createAlert } from '../../../../common/AlertBanner/AlertBannerSlice';

import WarehouseMenuItem from './warehouseMenuItem';

// import { changeSelectedWarehouse } from '../../redux/actions';
import {
  getDeletedWarehouseIDs,
  getEditing,
  getSelectedWarehouseID,
  getSelectedWarehouseLabel,
} from '../../redux/selectors';

import handleOutsideClick from '../../../../common/handleOutsideClick';
import AddWarehouseButton from '../add-warehouse/addWarehouse';

import DownwardChevron from '../../../../assets/downwardchevron.svg';

import './warehouseMenu.css';

const WarehouseMenu = (prop) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Close warehouse dropdown when user clicks outside of it
  handleOutsideClick(ref, () => {
    setOpen(false);
  });

  // Handles opening and closing the dropdown whenever the button is pressed
  const handleArrowClick = () => {
    setOpen(!open);
  };

  const checkIfCurrentWarehouseDeleted = () => {
    if (!prop.divisionDeleted && prop.allDeletedWarehouses
      .filter((id) => id.toString() === prop.currentWarehouseID.toString()).length > 0) {
      dispatch(createAlert({
        message: 'Changes to items belonging to the current warehouse won\'t be saved until the current warehouse is undeleted!',
        severity: 'warning',
      }));
    }
  };

  useEffect(() => {
    checkIfCurrentWarehouseDeleted();
  }, [prop.allDeletedWarehouses, prop.currentWarehouseID, prop.divisionDeleted]);

  // "No warehouses for this division" is shown when the user accesses
  // a division with no existing warehouses
  const NoWarehousesOption = () => (
    <button
      className="warehouse-menu--no-warehouses"
      type="button"
      label="No warehouse"
    >
      No warehouses for this division
    </button>
  );

  // Renders the warehouse menu for a division
  const renderWarehouseList = (list) => (
    <div className="warehouse-menu--list-container">
      <div
        name="category"
        className="warehouse-menu--list"
      >
        {/* Creating dropdown menu items from warehouse list */}
        {Object.keys(list).length > 1
          ? (Object.entries(list)
            // .filter((warehouse) => warehouse[0] !== currentWarehouseID.toString())
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map(([id, warehouse]) => (
              // MenuItem(id, warehouse.warehouse_name)));
              <WarehouseMenuItem
                warehouseId={id}
                warehouseName={warehouse.warehouse_name}
                setOpen={setOpen}
              />
            )))
          : <NoWarehousesOption />}
      </div>
    </div>
  );

  return (
    <div className="warehouse-container">
      <div ref={ref} className="warehouse-menu-container">
        {useSelector(getEditing) && (
          <AddWarehouseButton
            divisionList={prop.divisionList}
            selectedDivision={prop.selectedDivision}
          />
        )}
        <div className="warehouse-menu--top" type="button">
          <WarehouseMenuItem
            warehouseId={prop.currentWarehouseID}
            warehouseName={prop.currentWarehouseLabel}
            open={open}
            setOpen={setOpen}
            topLabel
          />
          <button type="button" className="warehouse-menu-arrow" onClick={handleArrowClick}>
            <img src={DownwardChevron} className={open ? 'warehouse-menu--close' : 'warehouse-menu--open'} alt="arrow" />
          </button>
        </div>
        {open && renderWarehouseList(prop.warehouseList)}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentWarehouseID: getSelectedWarehouseID(state),
  currentWarehouseLabel: getSelectedWarehouseLabel(state),
  allDeletedWarehouses: getDeletedWarehouseIDs(state),
});

export default connect(mapStateToProps, null)(WarehouseMenu);
