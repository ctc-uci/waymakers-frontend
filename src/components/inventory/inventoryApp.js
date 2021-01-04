import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EditButton from './EditButton/EditButton';
import DivisionMenu from './DivisionMenu/DivisionMenu';
import CategoryMenu from './CategoryMenu/CategoryMenu';
import SearchItem from './SearchItem/SearchItem';
import AddItemModal from './AddItem/AddItemModal';
import Table from './Table/Table';
import './inventoryApp.css';

import {
  getCategories, getEditing, getSelectedCategoryID, getSelectedCategoryLabel,
} from './redux/selectors';
import { fetchItems, fetchCategories } from './redux/actions';
import store from './redux/store';

const axios = require('axios');

const InventoryApp = () => {
  // Search substring
  const [searchSubstring, setSearchSubstring] = useState('');
  // Division list
  const [divisionList, setDivisionList] = useState([]);
  // Division selected by user
  const [selectedDivision, setSelectedDivision] = useState('');
  // Edit state
  const [editState, setEditState] = useState('');

  // Displays selected category
  const CurrentCategoryLabel = () => {
    const currentCategory = useSelector(getSelectedCategoryLabel) === '' ? ' All Categories' : ` ${useSelector(getSelectedCategoryLabel)}`;
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
      const response = await axios.get('http://localhost:3000/divisions/');
      // Adding All Division" to divisionList
      setDivisionList([{ divisionLabel: 'Show All Divisions' }].concat(response.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  // Displays selected Division
  const CurrentDivisionLabel = () => {
    const currentDivision = selectedDivision === '' ? ' All Division' : ` ${selectedDivision}`;
    return (
      <div>
        <h3>
          Showing Division:
          {currentDivision}
        </h3>
        {useSelector(getEditing) && <AddItemModal />}
      </div>
    );
  };
  // Once component mounts, call getCategories and getDivisions
  useEffect(() => {
    getDivisions();
    // Fetching items and categories from server, and updating store
    store.dispatch(fetchItems());
    store.dispatch(fetchCategories());
  }, []);
  // Updates items list when selectedCategory changes or searchSubstring changes
  useEffect(() => {
    store.dispatch(fetchItems());
  }, [searchSubstring, selectedDivision, useSelector(getSelectedCategoryID)]);

  /**
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
  */
  return (
    <div className="inventory">
      <h1>Inventory</h1>
      <CurrentDivisionLabel />
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
        categoryList={useSelector(getCategories)}
        editing={useSelector(getEditing)}
      />
      <SearchItem
        searchSubstring={searchSubstring}
        setSearchSubstring={setSearchSubstring}
      />
      <CurrentCategoryLabel />
      <Table />
    </div>
  );
};

export default InventoryApp;
