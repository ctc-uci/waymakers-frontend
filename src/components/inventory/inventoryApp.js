import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditButton from './edit-button/editButton';
import DivisionMenu from './division-menu/divisionMenu';
import CategoryMenu from './category-menu/categoryMenu';
import SearchItem from './search-item/searchItem';
import Table from './table/table';
import AddCategoryButton from './add-category/addCategory';
import AddItemModal from './add-item/addItemModal';
import './inventoryApp.css';

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
  const dispatch = useDispatch();

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
    dispatch(fetchItems());
    dispatch(fetchCategories());
    dispatch(fetchDivisions());
    dispatch(fetchWarehouses());
  }, []);
  // Updates items list when search term, category, division or warehouse changes
  useEffect(() => {
    dispatch(fetchItems());
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
