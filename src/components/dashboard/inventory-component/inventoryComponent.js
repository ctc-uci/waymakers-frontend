import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import WarehouseMenu from '../../inventory/division-menu/warehouseMenu';

import './inventoryComponent.css';

const axios = require('axios');

const InventoryComponent = () => {
  const [topItems, setTopItems] = useState([]);
  // eslint-disable-next-line
   const [warehouseList, setWarehouseList] = useState([]);
  // eslint-disable-next-line
  const [currWarehouse, setCurrWarehouse] = useState('');

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

  // Fetching warehouse names from the server
  const getWarehouseList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/warehouses`,
        { withCredentials: true },
      );
      setWarehouseList(response.data);
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

  // Get items on page load
  useEffect(() => {
    getTopItems();
    getWarehouseList();
  }, []);

  return (
    <div className="inventory-component">
      <div className="warehouse-selector">
        {/* <h4 className="warehouse-selector-title">{currWarehouse}</h4> */}
        <WarehouseMenu dropdownType="dashboard" warehouseList={[]} />
      </div>
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
