const initialState = [];

// Handles the logic of updating the state
// depending on which action was dispatched
export default (state = initialState, action) => {
  switch (action.type) {
    case 'categories/categoriesLoaded': {
      console.log('[ACTION: categories/categoriesLoaded] Categories loaded');
      // Overloaded current state with new category list
      return [{ id: -1, label: 'Show All Categories' }].concat(action.payload);
    }
    case 'categories/categoryAdded': {
      console.log(`[ACTION: categories/categoryAdded] Adding category with label ${action.payload}`);
      // Appending the new category to our current list of categories
      return [...state, action.payload];
    }
    default: {
      // Return out current list of categories if nothing happened
      return state;
    }
  }
};
