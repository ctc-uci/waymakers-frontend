// Functions defined here create and dispatch action
// objects that are used to modify the state
const axios = require('axios');

// Fetching items from server
export const fetchItems = () => async (dispatch) => {
  const url = 'http://localhost:3000/inventory/';
  // TODO: Add filtering by division/category/search
  const paramsQuery = {
    params: {
      division: '',
      category: '',
      search: '',
    },
  };

  try {
    const response = await axios.get(url, paramsQuery);
    dispatch({ type: 'items/itemsLoaded', payload: response.data });
  } catch (err) {
    console.error(err);
  }
};

// Creates a category/categoryAdded action
export const addCategory = (newCategory) => async (dispatch) => {
  console.log('[IN ADDCATEGORY]');
  console.log(newCategory);
  try {
    const response = await axios.post('http://localhost:3000/category', newCategory);
    console.log(response);
    dispatch({ type: 'categories/categoryAdded', payload: response.data });
  } catch (err) {
    console.error(err);
  }
};

// Creates a category/categoryDeleted action
export const deleteCategory = (id) => ({
  type: 'categories/categoryDeleted',
  payload: { id },
});

// Fetching categories from server
export const fetchCategories = () => async (dispatch) => {
  const url = 'http://localhost:3000/category/';
  try {
    const response = await axios.get(url);
    dispatch({ type: 'categories/categoriesLoaded', payload: response.data });
  } catch (err) {
    console.error(err);
  }
};

// Creates an items/itemAdded action
export const addItem = (newItem) => async (dispatch) => {
  console.log('[IN ADDITEM]');
  console.log(newItem);
  try {
    const response = await axios.post('http://localhost:3000/inventory', newItem);
    console.log(response);
    dispatch({ type: 'items/itemAdded', payload: response.data });
  } catch (err) {
    console.error(err);
  }
};

// Creates a edits/addItemDelete action
export const deleteItem = (id) => ({
  type: 'edits/addItemDelete',
  payload: { id },
});

// Creates a edits/startEdits action
export const startEdits = () => ({
  type: 'edits/startEdits',
  payload: { },
});

// Creates a edits/saveEdits action
// TODO: Make API calls for edits/deletions
export const saveEdits = () => ({
  type: 'edits/saveEdits',
  payload: { },
});

// Creates a edits/cancelEdits action
export const cancelEdits = () => ({
  type: 'edits/cancelEdits',
  payload: { },
});
