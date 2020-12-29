import React, { useState } from 'react';
import store from '../redux/store';
import { addItem } from '../redux/actions';

const axios = require('axios');

// note: this is only used in AddItemModal.js

// Add item menu here
const AddItem = () => {
  // name of item
  const [name, setName] = useState('');
  // quantity of item currently in stock
  const [quantity, setQuantity] = useState(0);
  // quantity of item currently needed
  const [needed, setNeeded] = useState(0);
  // category of item
  const [category, setCategory] = useState('');
  // name of category to add
  const [label, setLabel] = useState('');
  // warehouse of item
  const [division, setDivision] = useState('');
  // name of warehouse to add
  const [warehouselabel, setWarehouseLabel] = useState('');

  const onSubmitAddItem = () => {
    // TODO: Handle empty/invalid items better
    if (name === '' || quantity < 0 || needed < 0) {
      alert('Invalid values for a new item');
      return;
    }
    store.dispatch(addItem({
      name, quantity, needed, division, category,
    }));
  };

  const onSubmitAddCategory = async () => {
    if (label === '') return;
    try {
      console.log(label);
      const response = await axios.post('http://localhost:3000/category', {
        label,
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };
  const onSubmitAddWarehouse = async () => {
    if (warehouselabel === '') return;
    try {
      console.log('warehouse label', warehouselabel);
      const response = await axios.post('http://localhost:3000/warehouse', {
        warehouselabel,
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/** ADD ITEM BUTTON */}
      <form className="d-flex flex-column" onSubmit={onSubmitAddItem}>
        <input
          type="text"
          className="form-control"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          className="form-control"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="number"
          className="form-control"
          value={needed}
          onChange={(e) => setNeeded(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Item Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Item Division"
          value={division}
          onChange={(e) => setDivision(e.target.value)}
        />
        <button type="submit" className="btn btn-success">Add</button>
      </form>
      {/** ADD CATEGORY BUTTON */}
      <form className="d-flex flex-column" onSubmit={onSubmitAddCategory}>
        <input
          type="text"
          placeholder="Category Label"
          className="form-control"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <button type="submit" className="btn btn-success">Add Category</button>
      </form>
      {/** ADD WAREHOUSE BUTTON */}
      <form className="d-flex flex-column" onSubmit={onSubmitAddWarehouse}>
        <input
          type="text"
          placeholder="Warehouse Label"
          className="form-control"
          value={warehouselabel}
          onChange={(e) => setWarehouseLabel(e.target.value)}
        />
        <button type="submit" className="btn btn-success">Add Warehouse</button>
      </form>
    </>
  );
};

export default AddItem;
