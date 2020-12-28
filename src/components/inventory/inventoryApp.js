import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import EditButton from './EditButton/EditButton';
import DivisionMenu from './DivisionMenu/DivisionMenu';
import CategoryMenu from './CategoryMenu/CategoryMenu';
import SearchItem from './SearchItem/SearchItem';
import Table from './Table/Table';
import './inventory.css';

import { getItemsX } from './redux/selectors';

const axios = require('axios');

const InventoryApp = () => {
  // Current list of items to display
  const [items, setItems] = useState([]);
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

  // Request items from server
  const getItems = async () => {
    let url;
    if (searchSubstring === '' && selectedCategory === '' && selectedDivision === '') {
      // NOT SEARCHING
      url = 'http://localhost:3000/inventory/';
    } else {
      // Searching for Division or CATEGORY or SUBSTRING
      url = 'http://localhost:3000/inventory/get/';
    }
    const paramsQuery = {
      params: {
        Division: selectedDivision,
        category: selectedCategory,
        search: searchSubstring,
      },
    };
    try {
      const response = await axios.get(url, paramsQuery);
      setItems(response.data);
    } catch (err) {
      console.error(err);
    }
  };

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
  }, []);
  // Updates items list when selectedCategory changes or searchSubstring changes
  useEffect(() => {
    getItems();
  }, [selectedCategory, searchSubstring, selectedDivision]);

  return (
    <div className="inventory">
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
        items={items}
        getItems={getItems}
        editState={editState}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  const itemsX = getItemsX(state);
  console.log(`Got itemX: ${itemsX}`);
  return { itemsX };
};

export default connect(mapStateToProps)(InventoryApp);
