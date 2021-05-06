const initialState = [];

// Handles the logic of updating the state
// depending on which action was dispatched
export default (state = initialState, action) => {
  switch (action.type) {
    case 'categories/categoriesLoaded': {
      // Overloaded current state with new items list
      return [{ id: -1, label: 'All Categories' }].concat(action.payload);
    }
    case 'categories/categoryAdded': {
      // Appending the new item
      return [...state].concat(action.payload);
    }
    case 'categories/categoryDeleted': {
      // Overload current state with new items list (without the deleted category)
      return [{ id: -1, label: 'All Categories' }].concat(action.payload);
    }
    default: {
      // Return our current list of categories if nothing happened
      return state;
    }
  }
};
