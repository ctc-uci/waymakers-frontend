import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import EditButton from './edit-button/editButton';
import DivisionMenu from './division-menu/divisionMenu';
import CategoryMenu from './category-menu/categoryMenu';
import SearchItem from './search-item/searchItem';
import Table from './table/table';
import AddCategoryButton from './add-category/addCategory';
import AddItemModal from './add-item/addItemModal';
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
  getSelectedWarehouseID,
} from './redux/selectors';

const InventoryApp = () => {
  // Displays selected category
  const CurrentCategoryLabel = () => {
    const currentCategory = useSelector(getSelectedCategoryLabel) === '' ? ' All Categories' : ` ${useSelector(getSelectedCategoryLabel)}`;
    return (
      <div>
        <h3 className="current-category-label">
          {currentCategory}
        </h3>
      </div>
    );
  };
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
    <div className="inventory-container">
      <div className="inventory">
        <div className="inventory-top">
          <EditButton />
          <DivisionMenu />
        </div>
        <SearchItem />
        <div className="category-container">
          {useSelector(getEditing) && <AddCategoryButton />}
          <CategoryMenu />
        </div>
        <div className="table-header-container">
          <CurrentCategoryLabel />
          {useSelector(getEditing) && <AddItemModal />}
        </div>
        <div className="table-container">
          <Table />
        </div>
      </div>
    </div>
  );
};

export default InventoryApp;
