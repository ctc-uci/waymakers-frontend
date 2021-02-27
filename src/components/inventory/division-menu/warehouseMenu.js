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

  // Creating dropdown selector for warehouse menu
  const Menu = (list) => (
    <div>
      <div
        name="category"
        className="warehouse-menu--list"
      >
        {/* Creating dropdown menu items from warehouse list */}
        {Object.entries(list)
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
          ))}
      </div>
    </div>
  );

  const [menu, setMenu] = useState(Menu(prop.warehouseList, 0));

  // Updates menu when warehouseList changes
  useEffect(() => {
    setMenu(
      Menu({
        '-1': { id: -1, warehouse_name: 'All Warehouses' },
        ...prop.warehouseList,
      }),
    );
  }, [prop.warehouseList]);

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
        {open && menu}
      </div>
    </div>
  );
};

export default WarehouseMenu;
