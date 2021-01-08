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
  getCategories,
  getEditing,
  getSelectedCategoryID,
  getSelectedCategoryLabel,
  getSearchTerm,
  getSelectedDivisionID,
  getSelectedDivisionLabel,
} from './redux/selectors';
import { fetchItems, fetchCategories, fetchDivisions } from './redux/actions';
import store from './redux/store';

const InventoryApp = () => {
  // search substring for the search bar
  const [searchSubstring, setSearchSubstring] = useState('');
  // Edit state
  const [editState, setEditState] = useState('');

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
    const currentDivision = useSelector(getSelectedDivisionLabel) === '' ? ' All Divisions' : `${useSelector(getSelectedDivisionLabel)}`;
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
  }, []);
  // Updates items list when search term, category, or division changes
  useEffect(() => {
    store.dispatch(fetchItems());
  }, [
    useSelector(getSearchTerm),
    useSelector(getSelectedCategoryID),
    useSelector(getSelectedDivisionID),
  ]);
  return (
    <div className="inventory">
      <CurrentDivisionLabel />
      <EditButton
        editState={editState}
        setEditState={setEditState}
      />
      <DivisionMenu />
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
