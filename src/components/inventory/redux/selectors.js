// Selectors are used to get data from the state

// Gets items from store
export const getItems = (store) => store.items.itemsList;

// Gets if inventory is in edit mode
export const getEditing = (store) => store.edits.editing;

// Gets items that will be deleted when edits are saved
export const getDeletedIDs = (store) => store.edits.deletedItems;
