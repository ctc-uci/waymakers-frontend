import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const axios = require('axios');

const InventoryComponent = () => {
  const [topItems, setTopItems] = useState([]);

  // Fetching top items from the server
  const getTopItems = async () => {
    axios.get('http://localhost:3000/inventory/top')
      .then((response) => {
        console.log(response.data);
        setTopItems(response.data);
      });
  };

  const itemDisplay = (item) => (
    <div style={{
      backgroundColor: '#C4C4C4',
      flex: '1 0 calc(33.333% - 20px)',
      margin: '10px 10px 10px',
    }}
    >
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
    <div style={{ outline: '1px solid black', display: 'inline-block' }}>
      <h3>Inventory</h3>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: '#c4c4c46b',
      }}
      >
        {topItems.map((item) => (
          itemDisplay(item)
        ))}
        <Link to="/inventory">
          <button type="button" style={{ alignSelf: 'flex-end', margin: '10px 0px 10px' }}>View All</button>
        </Link>
      </div>
    </div>
  );
};

export default InventoryComponent;
