import React, { useEffect, useState } from 'react';
import './inventory.css';
import CategoryMenu from './CategoryMenu';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Table from './Table';

const Inventory = () => {
  // Current list of items to display
  const [items, setItems] = useState([]);
  // Category selected by user in CategoryMenu
  const [selectedCategory, setSelectedCategory] = useState('');
  // Current list of categories (in scroll menu)
  const [categoryList, setCategoryList] = useState([]);
  // Search substring
  const [searchSubstring, setSearchSubstring] = useState('');

  // Request items from server
  const getItems = async () => {
    console.log('Getting items');
    try {
      // NOT SEARCHING
      if (searchSubstring === '') {
        const response = await fetch(
          `http://localhost:3000/inventory/${selectedCategory}`,
        );
        const jsonData = await response.json();
        setItems(jsonData);
      // SEARCH for item with ONLY SUBSTRING
      } else if (selectedCategory === '') {
        const response = await fetch(
          `http://localhost:3000/inventory/search/${searchSubstring}/`,
        );
        const jsonData = await response.json();
        setItems(jsonData);
      // SEARCH for item with SUBSTRING and CATEGORY
      } else {
        const response = await fetch(
          `http://localhost:3000/inventory/search/${searchSubstring}/${selectedCategory}`,
        );
        const jsonData = await response.json();
        setItems(jsonData);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // Request categories from server
  const getCategories = async () => {
    console.log('Getting categories');
    try {
      const response = await fetch('http://localhost:3000/category/');
      const jsonData = await response.json();
      // Adding All Categories" to categoryList
      setCategoryList([{ label: 'Show All Categories' }].concat(jsonData));
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
