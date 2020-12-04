import React, { useState } from 'react';

const axios = require('axios');

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

  const onSubmitAddItem = async () => {
    if (name === '' || quantity < 0 || needed < 0) return;
    // e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/inventory', {
        name, quantity, needed, category,
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmitAddCategory = async () => {
    if (label === '') return;
    // e.preventDefault();
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
    </>
  );
};

export default AddItem;
