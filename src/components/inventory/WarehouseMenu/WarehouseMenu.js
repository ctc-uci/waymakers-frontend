import React, { useEffect, useState } from 'react';

const WarehouseMenu = (prop) => {
  // Gets warehouse list from inventory.js
  const [warehouseList, setWarehouseList] = useState(prop.warehouseList);

  // Returns a button for a single warehouse
  const MenuItem = (label) => (
    <label htmlFor={label}>
      <input
        id={label}
        type="radio"
        name="warehouse"
        value={label}
        onChange={() => {
          const selectedCategory = (label === 'Show All Warehouses') ? '' : label;
          prop.setSelectedWarehouse(selectedCategory);
        }}
      />
      {label}
    </label>
  );

  // Creating list of buttons for warehouse menu
  const Menu = (list) => list.map((el) => {
    const { label } = el;
    console.log({ label }, { list });
    return MenuItem(label);
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
