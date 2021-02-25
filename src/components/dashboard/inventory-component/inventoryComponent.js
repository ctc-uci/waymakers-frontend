import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './inventoryComponent.css';

const axios = require('axios');

const InventoryComponent = (division) => {
  const [topItems, setTopItems] = useState([]);
  // eslint-disable-next-line
  const [warehouseList, setWarehouseList] = useState([]);
  // eslint-disable-next-line
  const [currWarehouse, setCurrWarehouse] = useState(0);

  // Fetching top items from the server
  const getTopItems = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/inventory/top`,
        { withCredentials: true },
      );
      setTopItems(response.data);
    } catch (err) {
      // eslint-disable-next-line
      console.error(err);
    }
  };

  const itemDisplay = (item) => (
    <div className="top-item">
      <p className="top-item-name">
        {item.name}
      </p>
      <div className="in-stock">
        In Stock
        {' '}
        <p className="in-stock-quantity">{item.quantity}</p>
      </div>
      <div className="needed">
        Needed
        {' '}
        <p className="needed-quantity">{item.needed}</p>
      </div>
    </div>
  );

  // Fetching warehouse names from the server
  const getWarehouseList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/warehouses?division=${JSON.stringify(division)}`,
        { withCredentials: true },
      );
      setWarehouseList(response.data);
    } catch (err) {
      // eslint-disable-next-line
      console.error(err);
    }
  };

  // Creating dropdown selector for warehouse menu
  const Menu = () => (
    <div className="warehouse-section">
      <select
        name="warehouses"
        className="warehouse-dropdown"
        value={currWarehouse}
        onChange={(e) => { setCurrWarehouse(parseInt(e.target.value, 10)); }}
      >
        {Object.entries(warehouseList)
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map(([id, warehouse]) => (
            <option key={id} value={id}>{warehouse.warehouse_name}</option>
          ))}
      </select>
    </div>
  );

  // Get items on page load
  useEffect(() => {
    getTopItems();
  }, []);

  // Get warehouses when division is updated
  useEffect(() => {
    getWarehouseList();
  }, [division]);

  return (
    <div className="inventory-component">
      { Menu() }
      <div className="top-items-section">
        {topItems.map((item) => (
          itemDisplay(item)
        ))}
      </div>
      <div className="view-inventory-section">
        <Link to="/inventory">
          <button type="button" className="view-inventory-button">View All</button>
        </Link>
      </div>
    </div>
  );
};

export default InventoryComponent;
