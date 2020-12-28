// Functions defined here create action
// objects that are used to modify the state

// Creates an ADD_ITEM action
export const addItem = (content) => ({
  type: 'ADD_ITEM',
  payload: { content },
});

// Creates a DELETE_ITEM action
export const deleteItem = (id) => ({
  type: 'DELETE_ITEM',
  payload: { id },
});
