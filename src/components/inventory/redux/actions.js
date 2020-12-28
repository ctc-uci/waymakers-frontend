// Functions defined here create action
// objects that are used to modify the state

const axios = require('axios');

// Creates an items/itemAdded action
export const addItem = (id, content) => ({
  type: 'items/itemAdded',
  payload: { id, content },
});

// Creates a items/itemDeleted action
export const deleteItem = (id) => ({
  type: 'items/itemDeleted',
  payload: { id },
});

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
