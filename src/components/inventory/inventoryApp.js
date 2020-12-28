import React, { useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import EditButton from './EditButton/EditButton';
import DivisionMenu from './DivisionMenu/DivisionMenu';
import CategoryMenu from './CategoryMenu/CategoryMenu';
import SearchItem from './SearchItem/SearchItem';
import Table from './Table/Table';
import './inventory.css';

import { getItems } from './redux/selectors';
import { addItem, fetchItems } from './redux/actions';
import store from './redux/store';

const axios = require('axios');

const InventoryApp = () => {
  // Current list of categories (in scroll menu)
  const [categoryList, setCategoryList] = useState([]);
  // Category selected by user in CategoryMenu
  const [selectedCategory, setSelectedCategory] = useState('');
  // Search substring
  const [searchSubstring, setSearchSubstring] = useState('');
  // Division list
  const [divisionList, setDivisionList] = useState([]);
  // Division selected by user
  const [selectedDivision, setSelectedDivision] = useState('');
  // Edit state
  const [editState, setEditState] = useState('');

  // Request categories from server
  const getCategories = async () => {
    console.log('Getting categories');
    try {
      const response = await axios.get('http://localhost:3000/category/');
      // Adding All Categories" to categoryList
      setCategoryList([{ label: 'Show All Categories' }].concat(response.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  // Displays selected category
  const CurrentCategoryLabel = () => {
    const currentCategory = selectedCategory === '' ? ' All Categories' : ` ${selectedCategory}`;
    return (
      <h3>
        Showing Category:
        {currentCategory}
      </h3>
    );
  };

  // Request Divisions from server
  const getDivisions = async () => {
    console.log('Getting Division');
    try {
      const response = await axios.get('http://localhost:3000/Division/');
      // Adding All Division" to divisionList
      setDivisionList([{ divisionLabel: 'Show All Divisions' }].concat(response.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  // Displays selected Division
  const CurrentdivisionLabel = () => {
    const currentDivision = selectedDivision === '' ? ' All Division' : ` ${selectedDivision}`;
    return (
      <h3>
        Showing Division:
        {currentDivision}
      </h3>
    );
  };
  // Once component mounts, call getCategories and getDivisions
  useEffect(() => {
    getCategories();
    getDivisions();
    // Fetching items from server, and updating store
    store.dispatch(fetchItems());
  }, []);
  // Updates items list when selectedCategory changes or searchSubstring changes
  useEffect(() => {
    store.dispatch(fetchItems());
  }, [selectedCategory, searchSubstring, selectedDivision]);

  const StoreDisplay = () => {
    const storeItems = useSelector(getItems);
    const divStyle = {
      border: '1px solid black',
    };
    return (
      <div style={divStyle}>
        <h4>Redux Store: getItems</h4>
        <pre>{JSON.stringify(storeItems, null, 2) }</pre>
      </div>
    );
  };

  const DispatchStoreButton = () => {
    const dispatch = useDispatch();
    const randID = Math.floor(10 + Math.random() * (100 - 10));
    const newItem = {
      name: 'newItem',
      quantity: 6,
      needed: 9,
      div_num: 0,
      category_id: 0,
    };
    const handleClick = () => { dispatch(addItem(randID, newItem)); };
    return (
      <button type="button" onClick={handleClick}>
        Add random item
      </button>
    );
  };

  return (
    <div className="inventory">
      <StoreDisplay />
      <DispatchStoreButton />
      <h1>Inventory</h1>
      <CurrentdivisionLabel />
      <EditButton
        editState={editState}
        setEditState={setEditState}
      />
      <DivisionMenu
        selectedDivision={selectedDivision}
        divisionList={divisionList}
        setSelectedDivision={setSelectedDivision}
      />
      <CategoryMenu
        selectedCategory={selectedCategory}
        categoryList={categoryList}
        setSelectedCategory={setSelectedCategory}
        editState={editState}
      />
      <SearchItem
        searchSubstring={searchSubstring}
        setSearchSubstring={setSearchSubstring}
      />
      <CurrentCategoryLabel />
      <Table
        editState={editState}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  const items = getItems(state);
  return { items };
};

export default connect(mapStateToProps)(InventoryApp);
