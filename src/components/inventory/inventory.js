import React from 'react';
import './inventory.css';
import DisplayItem from './DisplayItem';

const Inventory = () => (
  <div className="inventory">
    <h1>Inventory</h1>
    <h1 className="text-center mt-5">Warehouse #1</h1>
    <DisplayItem />
  </div>
);

export default Inventory;
