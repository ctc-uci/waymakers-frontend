import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';

import EditButton from '../../components/inventory/edit-button/editButton';
import DivisionMenu from '../../components/inventory/division-menu/divisionMenu';
import CategoryMenu from '../../components/inventory/category-menu/categoryMenu';
import SearchItem from '../../components/inventory/search-item/searchItem';
import Table from '../../components/inventory/table/table';
import AddCategoryButton from '../../components/inventory/add-category/addCategory';
import AddItemModal from '../../components/inventory/add-item/addItemModal';

import './inventoryPage.css';

import {
  fetchItems,
  fetchCategories,
  fetchDivisions,
  fetchWarehouses,
} from '../../components/inventory/redux/actions';
import {
  getEditing,
  getSelectedCategoryID,
  getSelectedCategoryLabel,
  getSearchTerm,
  getSelectedDivisionID,
  getSelectedWarehouseID,
} from '../../components/inventory/redux/selectors';

const InventoryPage = () => {
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
      <Helmet>
        <title>Waymakers | Inventory</title>
      </Helmet>
      <div className="inventory-top">
        <DivisionMenu />
      </div>
      <SearchItem />
      <div className="category-container">
        {useSelector(getEditing) && <AddCategoryButton />}
        <CategoryMenu />
      </div>
      <div className="table-header-container">
        <CurrentCategoryLabel />
      </div>
      <div className="edit-button-wrapper">
        <EditButton />
        {useSelector(getEditing) && <AddItemModal />}
      </div>
      <div className="table-container">
        <Table />
      </div>
    </div>
  );
};

export default InventoryPage;
