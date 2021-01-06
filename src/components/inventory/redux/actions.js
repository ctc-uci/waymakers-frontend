// Functions defined here create and dispatch action
// objects that are used to modify the state
import store from './store';

const axios = require('axios');

// Fetching items from server
export const fetchItems = () => async (dispatch) => {
  const url = 'http://localhost:3000/inventory/';
  // Getting filter values from store -
  // may be possible to do this with a selector
  const paramsQuery = {
    params: {
      division: store.getState().items.selectedDivision,
      category: store.getState().items.selectedCategoryID,
      search: store.getState().items.searchTerm,
    },
  };

  try {
    const response = await axios.get(url, paramsQuery);
    dispatch({ type: 'items/itemsLoaded', payload: response.data });
  } catch (err) {
    console.error(err);
  }
};

// Creates an items/searchTermModified action
export const searchItems = (searchTerm) => ({
  type: 'items/searchTermModified',
  payload: { searchTerm },
});

// Creates an items/searchDivisionModified action
export const searchDivisions = (id) => ({
  type: 'items/searchDivisionModified',
  payload: { id },
});

// Creates an items/categorySelected action
export const changeSelectedCategory = (newCategoryID, newCategoryLabel) => ({
  type: 'items/categorySelected',
  payload: { newCategoryID, newCategoryLabel },
});

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

// Creates a edits/addItemDelete action
export const deleteCategory = (id) => ({
  type: 'edits/addCategoryDelete',
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

// Creates a edits/addItemEdit action
// newValues must be an object
export const editItem = (id, newValues) => ({
  type: 'edits/addItemEdit',
  payload: { id, newValues },
});

// Creates a edits/startEdits action
export const startEdits = () => ({
  type: 'edits/startEdits',
  payload: { },
});

// Creates a edits/saveEdits action
export const saveEdits = () => async (dispatch) => {
  console.log('in saveEdits');
  const editPromises = [];
  const deletePromises = [];

  // Populating edited list with PUT requests for each edited item
  const editedItems = { ...store.getState().edits.editedItems };
  Object.keys(editedItems).forEach(async (id) => {
    editPromises.push(
      axios.put(`http://localhost:3000/inventory/${id}`, editedItems[id]),
    );
  });

  // Populating list with DELETE requests for each deleted item
  const deletedItems = [...store.getState().edits.deletedItems];
  deletedItems.forEach(async (id) => {
    deletePromises.push(
      axios.delete(`http://localhost:3000/inventory/${id}`),
    );
  });

  // Populating list with DELETE requests for each deleted category
  const deletedCategories = [...store.getState().edits.deletedCategories];
  deletedCategories.forEach(async (id) => {
    deletePromises.push(
      axios.delete(`http://localhost:3000/category/${id}`),
    );
  });

  // Perform all put requests concurrently
  Promise.all(editPromises)
    .catch((error) => { console.error(error); })
    .then(() => {
      // If there aren't any delete promises, we can just fetch the items now
      if (deletePromises.length === 0) {
        // Dispatch editsSaved action
        dispatch({ type: 'edits/editsSaved', payload: {} });
        // Fetch items list again
        dispatch(fetchItems());
        // Fetch category list again
        dispatch(fetchCategories());
      }
    });

  // Perform all delete requests concurrently
  Promise.all(deletePromises)
    .catch((error) => { console.error(error); })
    .then(() => {
      // Dispatch editsSaved action
      dispatch({ type: 'edits/editsSaved', payload: {} });
      // Fetch items list again
      dispatch(fetchItems());
      // Fetch category list again
      dispatch(fetchCategories());
    });
};

// Creates a edits/cancelEdits action
export const cancelEdits = () => ({
  type: 'edits/cancelEdits',
  payload: { },
});
