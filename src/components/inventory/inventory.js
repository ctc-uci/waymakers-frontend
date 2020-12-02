import React, { useEffect, useState } from 'react';
import CategoryMenu from './CategoryMenu/CategoryMenu';
import AddItem from './AddItem/AddItem';
import SearchItem from './SearchItem/SearchItem';
import Table from './Table/Table';
import './inventory.css';

const axios = require('axios');

const Inventory = () => {
  // Current list of items to display
  const [items, setItems] = useState([]);
  // Current list of categories (in scroll menu)
  const [categoryList, setCategoryList] = useState([]);
  // Category selected by user in CategoryMenu
  const [selectedCategory, setSelectedCategory] = useState('');
  // Search substring
  const [searchSubstring, setSearchSubstring] = useState('');

  // Request items from server
  const getItems = async () => {
    console.log('Getting items');
    let url = '';
    if (searchSubstring === '') {
      // NOT SEARCHING
      url = `http://localhost:3000/inventory/${selectedCategory}`;
    } else if (selectedCategory === '') {
      // SEARCH for item with ONLY SUBSTRING
      url = `http://localhost:3000/inventory/search/${searchSubstring}`;
    } else {
      // SEARCH for item with SUBSTRING and CATEGORY
      url = `http://localhost:3000/inventory/search/${searchSubstring}/${selectedCategory}`;
    }
    try {
      const response = await axios.get(url);
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

  // Once component mounts, call getCategories
  useEffect(() => {
    getCategories();
  }, []);

  // Updates items list when selectedCategory changes or searchSubstring changes
  useEffect(() => {
    getItems();
  }, [selectedCategory, searchSubstring]);

  return (
    <div className="inventory">
      <h1>Inventory</h1>
      <h1 className="text-center mt-5">Warehouse #1</h1>
      <AddItem />
      <CategoryMenu
        selectedCategory={selectedCategory}
        categoryList={categoryList}
        setSelectedCategory={setSelectedCategory}
      />
      <SearchItem
        searchSubstring={searchSubstring}
        setSearchSubstring={setSearchSubstring}
      />
      <CurrentCategoryLabel />
      <Table items={items} getItems={getItems} />
    </div>
  );
};

export default Inventory;
