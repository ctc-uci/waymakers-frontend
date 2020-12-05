import React, { useEffect, useState } from 'react';
import CategoryMenu from './CategoryMenu/CategoryMenu';
import AddItem from './AddItem/AddItem';
import SearchItem from './SearchItem/SearchItem';
import Table from './Table/Table';
import './inventory.css';

import WarehouseMenu from './WarehouseMenu/WarehouseMenu';

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
  // Warehouse list
  const [warehouseList, setWarehouseList] = useState([]);
  // Warehouse selected by user
  const [selectedWarehouse, setSelectedWarehouse] = useState('');

  // Request items from server
  const getItems = async () => {
    let url;
    if (searchSubstring === '' && selectedCategory === '' && selectedWarehouse === '') {
      // NOT SEARCHING
      url = 'http://localhost:3000/inventory/';
    } else {
      // Searching for WAREHOUSE or CATEGORY or SUBSTRING
      url = 'http://localhost:3000/inventory/get/';
    }
    const paramsQuery = {
      params: {
        warehouse: selectedWarehouse,
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

  // Request warehouses from server
  const getWarehouses = async () => {
    console.log('Getting Warehouse');
    try {
      const response = await axios.get('http://localhost:3000/warehouse/');
      // Adding All Warehouse" to warehouseList
      setWarehouseList([{ warehouseLabel: 'Show All Warehouses' }].concat(response.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  // Displays selected warehouse
  const CurrentWarehouseLabel = () => {
    const currentWarehouse = selectedWarehouse === '' ? ' All Warehouse' : ` ${selectedWarehouse}`;
    return (
      <h3>
        Showing Warehouse:
        {currentWarehouse}
      </h3>
    );
  };
  // Once component mounts, call getCategories
  useEffect(() => {
    getCategories();
  }, []);

  //  Once component mounts, call getWarehouses
  useEffect(() => {
    getWarehouses();
  }, []);
  // Updates items list when selectedCategory changes or searchSubstring changes
  useEffect(() => {
    getItems();
  }, [selectedCategory, searchSubstring, selectedWarehouse]);

  return (
    <div className="inventory">
      <h1>Inventory</h1>
      <CurrentWarehouseLabel />
      <WarehouseMenu
        selectedWarehouse={selectedWarehouse}
        warehouseList={warehouseList}
        setSelectedWarehouse={setSelectedWarehouse}
      />
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
