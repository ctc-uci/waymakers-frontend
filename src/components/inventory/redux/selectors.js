// Selectors are used to get data from the state

// Gets items from store
export const getItems = (store) => store.items.itemsList;

// Gets current search term
export const getSearchTerm = (store) => store.items.searchTerm;

// Gets current selected category ID
export const getSelectedCategoryID = (store) => store.items.selectedCategoryID;

// Gets current selected category label
export const getSelectedCategoryLabel = (store) => store.items.selectedCategoryLabel;

// Gets categories from store
export const getCategories = (store) => store.categories;

// Gets divisions from store
export const getDivisions = (store) => store.divisions.divisionsList;

// Gets warehouses from store
export const getWarehouses = (store) => store.divisions.warehouseList;

// Gets current selected division ID
export const getSelectedDivisionID = (store) => store.items.selectedDivisionID;

// Gets current selected division label
/* eslint-disable arrow-body-style */
export const getSelectedDivisionLabel = (store) => {
  return store.divisions.divisionsList[store.items.selectedDivisionID].div_name;
};
/* eslint-enable */

// Gets current selected warehouse ID
export const getSelectedWarehouseID = (store) => store.items.selectedWarehouseID;

// Gets if inventory is in edit mode
export const getEditing = (store) => store.edits.editing;

// Gets items that will be deleted when edits are saved
export const getDeletedIDs = (store) => store.edits.deletedItems;
