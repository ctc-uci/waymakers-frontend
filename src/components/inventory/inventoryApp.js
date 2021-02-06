import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import EditButton from './edit-button/editButton';
import DivisionMenu from './division-menu/divisionMenu';
import CategoryMenu from './category-menu/categoryMenu';
import SearchItem from './search-item/searchItem';
import AddItemModal from './add-item/addItemModal';
import Table from './table/table';
import AddCategoryButton from './add-category/addCategory';

import './inventoryApp.css';

import store from './redux/store';
import {
  fetchItems,
  fetchCategories,
  fetchDivisions,
  fetchWarehouses,
} from './redux/actions';
import {
  getEditing,
  getSelectedCategoryID,
  getSelectedCategoryLabel,
  getSearchTerm,
  getSelectedDivisionID,
  getSelectedDivisionLabel,
  getSelectedWarehouseID,
} from './redux/selectors';

const InventoryApp = () => {
  // Displays selected category
  const CurrentCategoryLabel = () => {
    const currentCategory = useSelector(getSelectedCategoryLabel) === '' ? ' All Categories' : ` ${useSelector(getSelectedCategoryLabel)}`;
    return (
      <h3>
        {currentCategory}
      </h3>
    );
  };
  // Displays selected Division
  const CurrentDivisionLabel = () => {
    let currentDivision = useSelector(getSelectedDivisionLabel);
    currentDivision = currentDivision === '' ? ' All Divisions' : currentDivision;
    return (
      <div>
        <h1>
          {currentDivision}
          <span> Inventory</span>
        </h1>
        {useSelector(getEditing) && <AddItemModal />}
      </div>
    );
  };
  // Once component mounts, fetch items, categories, and divisions
  // from server and populate store
  useEffect(() => {
    store.dispatch(fetchItems());
    store.dispatch(fetchCategories());
    store.dispatch(fetchDivisions());
    store.dispatch(fetchWarehouses());
  }, []);
  // Updates items list when search term, category, division or warehouse changes
  useEffect(() => {
    store.dispatch(fetchItems());
  }, [
    useSelector(getSearchTerm),
    useSelector(getSelectedCategoryID),
    useSelector(getSelectedDivisionID),
    useSelector(getSelectedWarehouseID),
  ]);
  return (
    <div className="inventory">
      <CurrentDivisionLabel />
      <EditButton />
      <DivisionMenu />
      {useSelector(getEditing) && <AddCategoryButton />}
      <CategoryMenu />
      <SearchItem />
      <CurrentCategoryLabel />
      <Table />
    </div>
  );
};

export default InventoryApp;
