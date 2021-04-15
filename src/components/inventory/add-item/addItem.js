import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import { WMKBackend } from '../../../common/utils';

import {
  addItem,
  addCategory,
  addDivision,
  addWarehouse,
} from '../redux/actions';
import { getCategories, getDivisions } from '../redux/selectors';

// note: this is only used in AddItemModal.js

// Add item menu here
const AddItem = (prop) => {
  const dispatch = useDispatch();
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
  // list of warehouses attached to the currently selected division
  const [warehouses, setWarehouses] = useState([]);
  // currently selected warehouse
  const [warehouse, setWarehouse] = useState('');
  // label of new warehouse
  const [newWarehouse, setNewWarehouse] = useState('');
  // division of new warehouse
  const [newWarehouseDivision, setNewWarehouseDivision] = useState(-1);

  useEffect(() => {
    // Fetches warehouses connected to the selected division
    const fetchWarehouses = async () => {
      const response = await WMKBackend('/warehouses', { params: { division } });
      setWarehouses(response.data);
    };
    fetchWarehouses();
    setWarehouse('');
  }, [division]);

  const onSubmitAddItem = () => {
    // Create an add item action
    dispatch(addItem({
      name, quantity, needed, warehouse, category,
    }));
  };

  const onSubmitAddCategory = () => {
    // Create an add category action
    dispatch(addCategory({
      label,
    }));
  };
  const onSubmitAddDivision = () => {
    // Create an add division action
    dispatch(addDivision({
      divisionLabel,
    }));
  };

  const onSubmitAddWarehouse = () => {
    // Create an add warehouse action
    dispatch(addWarehouse({
      warehouseLabel: newWarehouse,
      division: newWarehouseDivision,
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
          {prop.categories
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
          <option value="" selected disabled>Select Division</option>
          {/* Creating dropdown menu items from divisions list */}
          {/* division.div_name is displayed, but the value of the option will be the ID */}
          {Object.entries(prop.divisions)
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map(([id, divi]) => (
              <option value={id}>{divi.div_name}</option>
            ))}
        </select>
        <select
          className="form-control"
          id="warehouses"
          name="warehouses"
          onChange={(e) => setWarehouse(e.target.value)}
        >
          <option value="" selected disabled>Select Warehouse (Required)</option>
          {warehouses.map((wh) => (
            <option value={wh.id}>{wh.warehouse_name}</option>
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
      {/** ADD Warehouse BUTTON */}
      <form className="d-flex flex-column" onSubmit={onSubmitAddWarehouse}>
        <select
          className="form-control"
          id="divisions"
          name="divisions"
          onChange={(e) => setNewWarehouseDivision(e.target.value)}
        >
          <option value="" selected disabled>Select Division</option>
          {Object.entries(prop.divisions)
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map(([id, divi]) => (
              <option value={id}>{divi.div_name}</option>
            ))}
        </select>
        <input
          type="text"
          placeholder="Warehouse label"
          className="form-control"
          value={newWarehouse}
          onChange={(e) => setNewWarehouse(e.target.value)}
        />
        <button type="submit" className="btn btn-success">Add Warehouse</button>
      </form>
    </>
  );
};

// Connecting component props to redux state
const mapStateToProps = (state) => ({
  categories: getCategories(state),
  divisions: getDivisions(state),
});

export default connect(mapStateToProps, null)(AddItem);
