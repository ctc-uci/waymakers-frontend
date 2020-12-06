import React, { useEffect, useState } from 'react';
import './WarehouseMenu.css';

const WarehouseMenu = (prop) => {
  // Gets warehouse list from inventory.js
  const [warehouseList, setWarehouseList] = useState(prop.warehouseList);

  // Returns a button for a single warehouse
  const MenuItem = (warehouselabel) => (
    <label htmlFor={warehouselabel}>
      <input
        id={warehouselabel}
        type="radio"
        name="warehouse"
        value={warehouselabel}
        onChange={() => {
          const selectedCategory = (warehouselabel === 'Show All Warehouses') ? '' : warehouselabel;
          prop.setSelectedWarehouse(selectedCategory);
        }}
      />
      {warehouselabel}
    </label>
  );

  // Creating list of buttons for warehouse menu
  const Menu = (list) => list.map((el) => {
    const { warehouselabel } = el;
    console.log({ warehouselabel }, { el });
    return MenuItem(warehouselabel);
  });

  const [menu, setMenu] = useState(Menu(warehouseList, 0));

  // Updates state when warehouse list in inventory.js updates
  useEffect(() => {
    setWarehouseList(prop.warehouseList);
  }, [prop.warehouseList]);

  // Updates list of warehouse buttons once warehouse list is updated
  useEffect(() => {
    setMenu(Menu(warehouseList, 0));
  }, [warehouseList]);
  console.log('here', { warehouseList });

  return (
    <form>
      <ul>
        {menu}
      </ul>
    </form>
  );
};

export default WarehouseMenu;
