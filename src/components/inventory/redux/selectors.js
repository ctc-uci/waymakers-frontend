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
export const getDivisions = (store) => store.divisions;

// Gets selected division object
export const getSelectedDivision = (store) => {
  const selectedID = store.items.selectedDivision;
  return store.divisions.find((div) => div.id === selectedID);
};

// Gets if inventory is in edit mode
export const getEditing = (store) => store.edits.editing;

// Gets items that will be deleted when edits are saved
export const getDeletedIDs = (store) => store.edits.deletedItems;
