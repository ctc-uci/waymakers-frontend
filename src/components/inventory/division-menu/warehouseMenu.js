import React, { useEffect, useState } from 'react';

import store from '../redux/store';
import { changeSelectedWarehouse } from '../redux/actions';

import './warehouseMenu.css';

const WarehouseMenu = (prop) => {
  // Creating dropdown selector for warehouse menu
  const Menu = (list) => (
    <div className="warehouse-menu-container">
      <select
        name="category"
        className="warehouse-menu"
        value={prop.selectedWarehouse}
        onChange={(e) => { store.dispatch(changeSelectedWarehouse(parseInt(e.target.value, 10))); }}
      >
        {/* Creating dropdown menu items from warehouse list */}
        {Object.entries(list)
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map(([id, warehouse]) => (
            <option key={id} value={id}>{warehouse.warehouse_name}</option>
          ))}
      </select>
    </div>
  );

  const [menu, setMenu] = useState(Menu(prop.warehouseList));

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
    <div>
      {menu}
    </div>
  );
};

export default WarehouseMenu;
