import React, { useEffect, useState } from 'react';

const WarehouseMenu = (prop) => {
  // Gets warehouse list from inventory.js
  const [warehouseList, setWarehouseList] = useState(prop.warehouseList);

  // Returns a button for a single warehouse
  const MenuItem = (label) => {
    // Updates selectedwarehouse in inventory.js, using function passed in
    const onClickWarehouseItem = () => {
      const selectedWarehouse = (label === 'Show All Warehouses') ? '' : label;
      prop.setSelectedWarehouse(selectedWarehouse);
    };
    return (
      <input
        type="radio"
        value={label}
        onChange={onClickWarehouseItem}
      />

    );
  };

  // Creating list of buttons for warehouse menu
  const Menu = (list) => list.map((el) => {
    const { label } = el;
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

  return (
    <form>
      <ul>
        {menu}
      </ul>
    </form>
  );
};

export default WarehouseMenu;
