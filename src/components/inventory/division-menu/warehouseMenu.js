import React, { useEffect, useState } from 'react';

import store from '../redux/store';
import { changeSelectedWarehouse } from '../redux/actions';

import './warehouseMenu.css';

const WarehouseMenu = (prop) => {
  //  Returns a button for a single warehouse
  const MenuItem = (warehouseID, warehouseLabel) => (
    <label htmlFor={warehouseLabel} key={warehouseID}>
      <input
        id={warehouseID}
        className="warehouse-radio-button"
        type="radio"
        name="warehouse"
        value={warehouseID}
        onChange={() => {
          store.dispatch(changeSelectedWarehouse(parseInt(warehouseID, 10)));
        }}
      />
      {warehouseLabel}
    </label>
  );

  // Creating list of buttons for warehouse menu
  const Menu = (list) => Object.entries(list)
    .sort((a, b) => (a.id > b.id ? 1 : -1))
    .map(([id, warehouse]) => (
      MenuItem(id, warehouse.warehouse_name)));

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
    <form>
      {menu}
    </form>
  );
};

export default WarehouseMenu;
