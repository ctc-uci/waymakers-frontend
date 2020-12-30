// Selectors are used to get data from the state

// Gets items from store
export const getItems = (store) => store.items;

// Gets categories from store
export const getCategories = (store) => store.categories;
// Gets if inventory is in edit mode
export const getEditing = (store) => store.edits.editing;

export const getTestState2 = (store) => store.test;
