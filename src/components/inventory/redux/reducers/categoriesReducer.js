const initialState = [];

// Handles the logic of updating the state
// depending on which action was dispatched
export default (state = initialState, action) => {
  switch (action.type) {
    case 'categories/categoriesLoaded': {
      console.log('[ACTION: categories/categoriesLoaded] Categories loaded');
      // Overloaded current state with new items list
      return [{ label: 'Show All Categories' }].concat(action.payload);
    }
    case 'categories/categoryAdded': {
      console.log(`[ACTION: categories/categoryAdded] Adding category with label ${action.payload}`);
      // Appending the new item
      return [...state, action.payload];
    }
    case 'categories/categoryDeleted': { // TODO
      console.log('[ACTION: categories/categoryDeleted] Deleting category');
      return [{ label: 'Show All Categories' }].concat(action.payload);
    }
    default: {
      return state;
    }
  }
};
