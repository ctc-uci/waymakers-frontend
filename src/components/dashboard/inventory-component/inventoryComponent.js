import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import './inventoryComponent.css';

const axios = require('axios');

const InventoryComponent = ({ division }) => {
  const [topItems, setTopItems] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);
  const [warehouseIndex, setWarehouseIndex] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [warehouseIDMap, setWarehouseIDMap] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [warehouseName, setWarehouseName] = useState('');

  // Fetching top items from the server
  const getTopItems = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/inventory/top?warehouse=${warehouseIDMap[warehouseName]}`,
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
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/warehouses?division=${division}`,
        { withCredentials: true },
      );
      setWarehouseList(response.data);

      const warehouseMap = {};
      response.data.forEach((warehouse) => {
        warehouseMap[warehouse.warehouse_name] = warehouse.id;
      });

      setWarehouseIDMap(warehouseMap);
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
        value={warehouseIndex - 1}
        onChange={(e) => {
          setWarehouseIndex(parseInt(e.target.value, 10) + 1);
          setWarehouseName(warehouseList[parseInt(e.target.value, 10)].warehouse_name);
        }}
      >
        {Object.entries(warehouseList)
          .map(([id, warehouse]) => (
            <option key={id} value={id}>{warehouse.warehouse_name}</option>
          ))}
      </select>
    </div>
  );

  // Get warehouses when division is updated
  useEffect(() => {
    getWarehouseList();
  }, [division]);

  // Get default warehouse when warehouse list is loaded
  useEffect(() => {
    if (warehouseList[0]) {
      setWarehouseName(warehouseList[0].warehouse_name);
      setWarehouseIndex(0);
    }
  }, [warehouseList]);

  // Get top items when warehouse is selected
  useEffect(() => {
    if (warehouseName) {
      getTopItems();
    }
  }, [warehouseName]);

  const renderInfo = () => {
    if (warehouseList.length === 0) {
      return (
        <div className="no-items-message"> No warehouses in this division :( </div>
      );
    }
    if (topItems.length === 0) {
      return (<div className="no-items-message"> No items in this warehouse :( </div>);
    }
    return (
      <div className="top-items-section">
        {topItems.map((item) => (
          itemDisplay(item)
        ))}
      </div>
    );
  };

  return (
    <div className="inventory-component">
      { warehouseList.length > 0 && Menu() }
      {renderInfo()}
      <div className="view-inventory-section">
        <Link to="/inventory">
          <button type="button" className="view-inventory-button">View All</button>
        </Link>
      </div>
    </div>
  );
};

InventoryComponent.propTypes = {
  division: PropTypes.number.isRequired,
};

export default InventoryComponent;
