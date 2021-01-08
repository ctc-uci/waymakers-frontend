import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import store from '../redux/store';
import { addItem, addCategory, addDivision } from '../redux/actions';
import { getCategories, getDivisions } from '../redux/selectors';

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
  // division of item
  const [division, setDivision] = useState('');
  // name of division to add
  const [divisionLabel, setDivisionLabel] = useState('');

  const onSubmitAddItem = () => {
    // TODO: Handle empty/invalid items better
    if (name === '' || quantity < 0 || needed < 0) {
      return;
    }
    // Create an add item action
    store.dispatch(addItem({
      name, quantity, needed, division, category,
    }));
  };

  const onSubmitAddCategory = async () => {
    // Create an add category action
    store.dispatch(addCategory({
      label,
    }));
  };
  const onSubmitAddDivision = async () => {
    // Create an add division action
    store.dispatch(addDivision({
      divisionLabel,
    }));
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
        <select
          className="form-control"
          id="categories"
          name="categories"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" selected>No category</option>
          {/* Creating dropdown menu items from categories list */}
          {/* category.label is displayed, but the value of the option will be the ID */}
          {useSelector(getCategories)
            .filter((cat) => cat.id > 0)
            .map((cat) => (
              <option value={cat.id}>{cat.label}</option>
            ))}
        </select>
        <select
          className="form-control"
          id="divisions"
          name="divisions"
          onChange={(e) => setDivision(e.target.value)}
        >
          <option value="" selected>No division</option>
          {/* Creating dropdown menu items from divisions list */}
          {/* division.div_name is displayed, but the value of the option will be the ID */}
          {useSelector(getDivisions)
            .filter((div) => div.id > 0)
            .map((div) => (
              <option value={div.id}>{div.div_name}</option>
            ))}
        </select>
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
      {/** ADD DIVISION BUTTON */}
      <form className="d-flex flex-column" onSubmit={onSubmitAddDivision}>
        <input
          type="text"
          placeholder="Division Label"
          className="form-control"
          value={divisionLabel}
          onChange={(e) => setDivisionLabel(e.target.value)}
        />
        <button type="submit" className="btn btn-success">Add Division</button>
      </form>
    </>
  );
};

export default AddItem;
