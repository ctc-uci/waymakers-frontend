const initialState = [];

// Handles the logic of updating the state
// depending on which action was dispatched
export default (state = initialState, action) => {
  switch (action.type) {
    case 'categories/categoriesLoaded': {
      // Overloaded current state with new items list
      return [{ id: -1, label: 'Show All Categories' }].concat(action.payload);
    }
    case 'categories/categoryAdded': {
      // Appending the new item
      return [...state, action.payload];
    }
    case 'categories/categoryDeleted': { // TODO
      return [{ id: -1, label: 'Show All Categories' }].concat(action.payload);
    }
    default: {
      return state;
    }
  }
};
