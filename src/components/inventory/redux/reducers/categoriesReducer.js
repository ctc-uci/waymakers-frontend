const initialState = [];

// Handles the logic of updating the state
// depending on which action was dispatched
export default (state = initialState, action) => {
  switch (action.type) {
    case 'categories/categoriesLoaded': {
      console.log('[ACTION: categories/categoriesLoaded] Categories loaded');
      // Overloaded current state with new items list
      return action.payload;
    }
    case 'categories/categoryAdded': {
      console.log(`[ACTION: categories/categoryAdded] Adding category with label ${action.payload}`);
      // Appending the new item
      return [...state, action.payload];
    }
    case 'categories/categoryDeleted': { // TODO
      const { id } = action.payload;
      console.log(`[ACTION: categories/categoryDeleted] Deleting category with id=${id}`);
      return state;
    }
    default: {
      return state;
    }
  }
};
