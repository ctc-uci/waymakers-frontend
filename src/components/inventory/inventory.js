import React, { useEffect, useState } from 'react';
// import { json } from 'express';
import './inventory.css';
// import DisplayItem from './DisplayItem';
import CategoryMenu from './CategoryMenu';

const Inventory = () => {
  // Category selected by user in CategoryMenu
  const [selectedCategory, setSelectedCategory] = useState('');
  // Current list of categories (in scroll menu)
  const [categoryList, setCategoryList] = useState([]);

  // Request categories from server
  const getCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/category/');
      const jsonData = await response.json();
      // Adding All Categories" to categoryList
      setCategoryList([{ label: 'Show All Categories' }].concat(jsonData));
    } catch (err) {
      console.error(err.message);
    }
  };

  // Once component mounts, call getCategories
  useEffect(() => {
    getCategories();
    console.log('in useEffect');
  }, []);

  return (
    <div className="inventory">
      <h1>Inventory</h1>
      <h1 className="text-center mt-5">Warehouse #1</h1>
      <CategoryMenu
        selectedCategory={selectedCategory}
        categoryList={categoryList}
        setSelectedCategory={setSelectedCategory}
      />
      {/* <AddItem />
      <ScrollMenu
        data={menu}
        arrowLeft={ArrowLeft}
        arrowRight={ArrowRight}
        selected={0}
      />
      <SearchItem />
      <CurrentCategoryLabel />
      <Table items={items} getItems={getItems} /> */}
    </div>
  );
};

export default Inventory;
