import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import { WMKBackend } from '../../../common/utils';

import {
  LightModalHeader,
  LightModalBody,
  LightModalButton,
} from '../../../common/LightModal';
import { addItem } from '../redux/actions';
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
  // division of item
  const [division, setDivision] = useState('');
  // list of warehouses attached to the currently selected division
  const [warehouses, setWarehouses] = useState([]);
  // currently selected warehouse
  const [warehouse, setWarehouse] = useState('');

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

  return (
    <>
      <LightModalHeader title="Add a New Item" onClose={() => prop.setIsOpen(false)} />
      <LightModalBody>
        <form className="add-item-form" onSubmit={onSubmitAddItem}>
          <div className="add-item-input-title">
            Name
            <span className="add-item-mandatory"> *</span>
          </div>
          <input
            type="text"
            className="add-item-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="add-item-input-title">
            In Stock
            <span className="add-item-mandatory"> *</span>
          </div>
          <input
            type="number"
            className="add-item-input"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <div className="add-item-input-title">
            # Needed
            <span className="add-item-mandatory"> *</span>
          </div>
          <input
            type="number"
            className="add-item-input"
            value={needed}
            onChange={(e) => setNeeded(e.target.value)}
          />
          <div className="add-item-input-title">
            Division
            <span className="add-item-mandatory"> *</span>
          </div>
          <select
            className="add-item-form"
            id="divisions"
            name="divisions"
            onChange={(e) => setDivision(e.target.value)}
          >
            <option value="" selected disabled>Select Division...</option>
            {/* Creating dropdown menu items from divisions list */}
            {/* division.div_name is displayed, but the value of the option will be the ID */}
            {Object.entries(prop.divisions)
              .sort((a, b) => (a.id > b.id ? 1 : -1))
              .map(([id, divi]) => (
                <option value={id}>{divi.div_name}</option>
              ))}
          </select>
          <div className="add-item-input-title">
            Warehouse
            <span className="add-item-mandatory"> *</span>
          </div>
          <select
            className="add-item-form"
            id="warehouses"
            name="warehouses"
            onChange={(e) => setWarehouse(e.target.value)}
          >
            <option value="" selected disabled>Select Warehouse...</option>
            {warehouses.map((wh) => (
              <option value={wh.id}>{wh.warehouse_name}</option>
            ))}
          </select>
          <div className="add-item-input-title">
            Category
          </div>
          <select
            className="add-item-form add-item-last-field"
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
          <LightModalButton
            primary
            type="submit"
            className="add-item-submit"
          >
            Submit
          </LightModalButton>
          <LightModalButton
            secondaryOutline
            type="button"
            onClick={() => prop.setIsOpen(false)}
            className="add-item-cancel"
          >
            Cancel
          </LightModalButton>
        </form>
      </LightModalBody>
    </>
  );
};

// Connecting component props to redux state
const mapStateToProps = (state) => ({
  categories: getCategories(state),
  divisions: getDivisions(state),
});

export default connect(mapStateToProps, null)(AddItem);
