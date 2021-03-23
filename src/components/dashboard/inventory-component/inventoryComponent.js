import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './inventoryComponent.css';

const axios = require('axios');

const InventoryComponent = () => {
  const [topItems, setTopItems] = useState([]);

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
      <h4>
        {item.name}
      </h4>
    </div>
  );

  // Get items on page load
  useEffect(() => {
    getTopItems();
  }, []);

  return (
    <div>
      <h3>Inventory</h3>
      <div id="top-item-box">
        {topItems.map((item) => (
          itemDisplay(item)
        ))}
        <Link to="/inventory">
          <button type="button" id="view-inventory-button">View All</button>
        </Link>
      </div>
    </div>
  );
};

export default InventoryComponent;
