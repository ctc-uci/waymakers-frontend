import React, { useEffect, useState } from 'react';

const axios = require('axios');

const InventoryComponent = () => {
  const [topItems, setTopItems] = useState([]);

  const getTopItems = async () => {
    axios.get('http://localhost:3000/inventory/top')
      .then((response) => {
        console.log(response.data);
        setTopItems(response.data);
      });
  };

  useEffect(() => {
    getTopItems();
  }, []);

  return (
    <div>
      {topItems.map((item) => (
        <div>{item.name}</div>
      ))}
      {/* <pre>{JSON.stringify(topItems, null, 2)}</pre> */}
    </div>
  );
};

export default InventoryComponent;
