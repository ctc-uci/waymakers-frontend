// Selectors are used to get data from the state

// Gets items from store
export const getItems = (store) => store.items.itemsList;

export const getItemByID = (store, id) => store.items.itemsList.find((item) => item.id === id);

// Gets current selected category ID
export const getSelectedCategoryID = (store) => store.items.selectedCategoryID;

// Gets current selected category label
export const getSelectedCategoryLabel = (store) => store.items.selectedCategoryLabel;

// Gets categories from store
export const getCategories = (store) => store.categories;

// Gets if inventory is in edit mode
export const getEditing = (store) => store.edits.editing;

// Gets items that will be deleted when edits are saved
export const getDeletedIDs = (store) => store.edits.deletedItems;
