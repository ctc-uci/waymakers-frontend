// Functions defined here create and dispatch action
// objects that are used to modify the state
import { WMKBackend } from '../../../common/utils';

// Fetching items from server
export const fetchItems = () => async (dispatch, getState) => {
  const url = '/inventory';
  const paramsQuery = {
    params: {
      division: getState().items.selectedDivisionID,
      warehouse: getState().items.selectedWarehouseID,
      category: getState().items.selectedCategoryID,
      search: getState().items.searchTerm,
    },
  };

  try {
    const response = await WMKBackend.get(url, paramsQuery);
    dispatch({ type: 'items/itemsLoaded', payload: response.data });
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
  }
};

// Fetching categories from server
export const fetchCategories = () => async (dispatch) => {
  const url = '/category';
  try {
    const response = await WMKBackend.get(url);
    dispatch({ type: 'categories/categoriesLoaded', payload: response.data });
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
  }
};

// Fetching divisions from server
export const fetchDivisions = () => async (dispatch) => {
  const url = '/divisions';
  try {
    const response = await WMKBackend.get(url);
    // Converting array of objects into an associative array
    const divisions = response.data.reduce(
      (obj, item) => Object.assign(obj, { [item.id]: item }), {},
    );
    console.log(divisions);
    dispatch({ type: 'divisions/divisionsLoaded', payload: divisions });
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
  }
};

// Fetching warehouses from server, by divisionID
export const fetchWarehouses = (division = -1) => async (dispatch) => {
  const paramsQuery = {
    params: { division },
  };
  try {
    const response = await WMKBackend.get('/warehouses', paramsQuery);
    console.log(response.data);
    // Converting array of objects into an associative array
    const warehouses = response.data.reduce(
      (obj, item) => Object.assign(obj, { [item.id]: item }), {},
    );
    dispatch({ type: 'divisions/loadWarehouses', payload: warehouses });
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
  }
};

// Creates an items/searchTermModified action
export const searchItems = (searchTerm) => ({
  type: 'items/searchTermModified',
  payload: searchTerm,
});

// Dispatches actions to change selected division, and load connected warehouses
export const changeSelectedDivision = (newDivisionID) => async (dispatch) => {
  dispatch({ type: 'items/searchDivisionModified', payload: { newDivisionID } });
  dispatch(fetchWarehouses(newDivisionID));
};

export const changeSelectedWarehouse = (newWarehouseID) => ({
  type: 'items/warehouseSelected',
  payload: { newWarehouseID },
});

// Creates an items/categorySelected action
export const changeSelectedCategory = (newCategoryID, newCategoryLabel) => ({
  type: 'items/categorySelected',
  payload: { newCategoryID, newCategoryLabel },
});

// Creates an items/itemAdded action
export const addItem = (newItem) => async (dispatch) => {
  try {
    const response = await WMKBackend.post('/inventory', newItem);
    dispatch({ type: 'items/itemAdded', payload: response.data });
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
  }
};

// Creates a edits/addItemDelete action
export const deleteItem = (id) => ({
  type: 'edits/addItemDelete',
  payload: { id },
});

// Creates a edits/revertItemDelete action
export const undeleteItem = (id) => ({
  type: 'edits/revertItemDelete',
  payload: { id },
});

// Creates a edits/addItemEdit action
// newValues must be an object
export const editItem = (id, newValues) => ({
  type: 'edits/addItemEdit',
  payload: { id, newValues },
});

// Creates a category/categoryAdded action
export const addCategory = (newCategory) => async (dispatch) => {
  try {
    const response = await WMKBackend.post('/category', newCategory);
    dispatch({ type: 'categories/categoryAdded', payload: response.data });
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
  }
};

// Creates a edits/addItemDelete action
export const deleteCategory = (id) => ({
  type: 'edits/addCategoryDelete',
  payload: { id },
});

export const undeleteCategory = (id) => ({
  type: 'edits/revertCategoryDelete',
  payload: { id },
});

// Creates a divisions/divisionAdded action
export const addDivision = (newDivision) => async (dispatch) => {
  try {
    const response = await WMKBackend.post('/divisions', newDivision);
    dispatch({ type: 'divisions/divisionAdded', payload: response.data });
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
  }
};

// Creates a edits/addDivisionDelete action
export const deleteDivision = (id) => ({
  type: 'edits/addDivisionDelete',
  payload: { id },
});

export const undeleteDivision = (id) => ({
  type: 'edits/revertDivisionDelete',
  payload: { id },
});

export const editDivision = (id, newValues) => ({
  type: 'edits/addDivisionEdit',
  payload: { id, newValues },
});

export const addWarehouse = (newWarehouse) => async (dispatch) => {
  try {
    const response = await WMKBackend.post('/warehouses', newWarehouse);
    console.log(response.data);
    dispatch({ type: 'divisions/warehouseAdded', payload: response.data });
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
  }
};

// Creates a edits/addWarehouseDelete action
export const deleteWarehouse = (id) => ({
  type: 'edits/addWarehouseDelete',
  payload: { id },
});

export const undeleteWarehouse = (id) => ({
  type: 'edits/revertWarehouseDelete',
  payload: { id },
});

export const editWarehouse = (id, newValues) => ({
  type: 'edits/addWarehouseEdit',
  payload: { id, newValues },
});

// Creates a edits/startEdits action
export const startEdits = () => ({
  type: 'edits/startEdits',
  payload: { },
});

// Creates a edits/cancelEdits action
export const cancelEdits = () => ({
  type: 'edits/cancelEdits',
  payload: { },
});

// Creates a edits/saveEdits action
export const saveEdits = () => async (dispatch, getState) => {
  const editPromises = [];
  const deletePromises = [];
  const currentCategoryID = getState().items.selectedCategoryID;
  const currentDivisionID = getState().items.selectedDivisionID;
  const currentWarehouseID = getState().items.selectedWarehouseID;

  // Populating edited list with PUT requests for each edited item
  const editedItems = { ...getState().edits.editedItems };
  Object.keys(editedItems).forEach(async (id) => {
    editPromises.push(
      WMKBackend.put(`/inventory/${id}`, editedItems[id]),
    );
  });

  // Populating list with DELETE requests for each deleted item
  const deletedItems = [...getState().edits.deletedItems];
  deletedItems.forEach(async (id) => {
    deletePromises.push(
      WMKBackend.delete(`/inventory/${id}`),
    );
  });

  // Populating list with DELETE requests for each deleted category
  const deletedCategories = [...getState().edits.deletedCategories];
  deletedCategories.forEach(async (id) => {
    deletePromises.push(
      WMKBackend.delete(`/category/${id}`),
    );
  });
  // Switching back to All Categories if the current category was deleted
  if (currentCategoryID in deletedCategories.reduce(
    (prev, val) => ({ ...prev, [val]: val }), {},
  )) {
    dispatch({ type: 'items/categorySelected', payload: { newCategoryID: -1, newCategoryLabel: 'All Categories' } });
  }

  // Populating list with DELETE requests for each deleted division
  const deletedDivisions = [...getState().edits.deletedDivisions];
  deletedDivisions.forEach(async (id) => {
    deletePromises.push(
      WMKBackend.delete(`/divisions/${id}`),
    );
  });
  // Switching back to All Divisions / All Warehouses if the current division was deleted
  if (deletedDivisions
    .filter((id) => currentDivisionID.toString() === id.toString()).length > 0) {
    dispatch({ type: 'items/searchDivisionModified', payload: { newDivisionID: -1 } });
    dispatch({ type: 'items/warehouseSelected', payload: { newWarehouseID: -1 } });
  }

  const deletedWarehouses = [...getState().edits.deletedWarehouses];
  deletedWarehouses.forEach(async (id) => {
    deletePromises.push(
      WMKBackend.delete(`/warehouses/${id}`),
    );
  });
  // Switching back to All Warehouses if the current warehouse was deleted
  if (deletedWarehouses
    .filter((id) => currentWarehouseID.toString() === id.toString()).length > 0) {
    dispatch({ type: 'items/warehouseSelected', payload: { newWarehouseID: -1 } });
  }

  // Populating list with PUT requests for each edited division
  const editedDivisions = { ...getState().edits.editedDivisions };
  Object.keys(editedDivisions).forEach(async (id) => {
    editPromises.push(
      WMKBackend.put(`/divisions/${id}`, editedDivisions[id]),
    );
  });

  // Populating list with PUT requests for each edited warehouse
  const editedWarehouses = { ...getState().edits.editedWarehouses };
  Object.keys(editedWarehouses).forEach(async (id) => {
    editPromises.push(
      WMKBackend.put(`/warehouses/${id}`, editedWarehouses[id]),
    );
  });

  // Perform all delete requests concurrently
  await Promise.all(deletePromises)
    .catch((error) => {
      // eslint-disable-next-line
      console.error(error);
    })
    .then(() => {
      if (editPromises.length === 0) {
        // Dispatch editsSaved action
        dispatch({ type: 'edits/editsSaved', payload: {} });
        // Fetch items list again
        dispatch(fetchItems());
        // Fetch category list again
        dispatch(fetchCategories());
        // Fetch division list again
        dispatch(fetchDivisions());
        // Fetch warehouse list again
        dispatch(fetchWarehouses(currentDivisionID));
      }
    });

  // Perform all put requests concurrently
  Promise.all(editPromises)
    .catch((error) => {
      // eslint-disable-next-line
      console.error(error);
    })
    .then(() => {
      // Dispatch editsSaved action
      dispatch({ type: 'edits/editsSaved', payload: {} });
      // Fetch items list again
      dispatch(fetchItems());
      // Fetch category list again
      dispatch(fetchCategories());
      // Fetch division list again
      dispatch(fetchDivisions());
      // Fetch warehouse list again
      dispatch(fetchWarehouses(currentDivisionID));
    });
};
