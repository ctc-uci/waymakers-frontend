import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import store from '../redux/store';
import { getEditing } from '../redux/selectors';
import { changeSelectedWarehouse } from '../redux/actions';
import handleOutsideClick from '../../../common/handleOutsideClick';
import AddWarehouseButton from './add-warehouse/addWarehouse';
import './warehouseMenu.css';

const WarehouseMenu = (prop) => {
  const [currentWarehouse, setCurrentWarehouse] = useState('All Warehouses');
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Close warehouse dropdown when user clicks outside of it
  handleOutsideClick(ref, () => {
    setOpen(false);
  });

  // After 'All Warehouses' is deselected, if a user switches to a new division
  // and the current warehouse is not in that division, the menu switches to the
  // first warehouse in that division
  useEffect(() => {
    if (!(currentWarehouse in Object.keys(prop.warehouseList)) && currentWarehouse !== 'All Warehouses') {
      if (Object.keys(prop.warehouseList).length > 0) {
        const wlKeys = Object.keys(prop.warehouseList);
        setCurrentWarehouse(prop.warehouseList[wlKeys[wlKeys.length - 1]].warehouse_name);
      } else {
        setCurrentWarehouse('No warehouses');
      }
    }
  }, [prop.warehouseList]);

  // Handles opening and closing the dropdown whenever the button is pressed
  const handleArrowClick = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleWarehouseClick = (e, warehouseName) => {
    store.dispatch(changeSelectedWarehouse(parseInt(e.target.value, 10)));
    setCurrentWarehouse(warehouseName);
    setOpen(false);
  };

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
    <div
      name="category"
      className="warehouse-menu--list"
    >
      {/* Creating dropdown menu items from warehouse list */}
      {Object.keys(list).length > 0
        ? (Object.entries(list)
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map(([id, warehouse]) => (
            // MenuItem(id, warehouse.warehouse_name)));
            <button
              className="warehouse-menu--list-item"
              type="button"
              key={id}
              value={id}
              onClick={(e) => handleWarehouseClick(e, warehouse.warehouse_name)}
            >
              {warehouse.warehouse_name}
            </button>
          )))
        : <NoWarehousesOption />}
    </div>
  );

  return (
    <div className="warehouse-container">
      <div ref={ref} className="warehouse-menu-container">
        {useSelector(getEditing)
        && (
        <AddWarehouseButton
          divisionList={prop.divisionList}
          selectedDivision={prop.selectedDivision}
        />
        )}
        <div className="warehouse-menu--top">
          {currentWarehouse}
          <button
            type="button"
            aria-label="arrow"
            onClick={handleArrowClick}
            className={open ? 'warehouse-menu--close' : 'warehouse-menu--open'}
          />
        </div>
        {open && renderWarehouseList(prop.warehouseList)}
      </div>
    </div>
  );
};

export default WarehouseMenu;
