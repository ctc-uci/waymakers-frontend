import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './inventoryComponent.css';

const axios = require('axios');

const InventoryComponent = () => {
  const [topItems, setTopItems] = useState([]);
  // eslint-disable-next-line
  const [currWarehouse, setCurrWarehouse] = useState('Warehouse 1');

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
      <p>
        {item.name}
      </p>
      <div>
        In Stock
        {' '}
        {item.quantity}
      </div>
      <div>
        Needed
        {' '}
        {item.needed}
      </div>
    </div>
  );

  // Get items on page load
  useEffect(() => {
    getTopItems();
  }, []);

  return (
    <div className="inventory-component">
      <div className="warehouse-selector">
        <h4 className="warehouse-selector-title">{currWarehouse}</h4>
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
