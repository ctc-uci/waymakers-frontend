// Initial state populated with sample values
/*
const initialState = [
    {
      "id": 0,
      "name": "sampleItem",
      "quantity": -1,
      "needed": -1,
      "div_num": -1,
      "category_id": -1
    }
*/
const initialState = []; // List of item objects

// Handles the logic of updating the state
// depending on which action was dispatched
export default (state = initialState, action) => {
  switch (action.type) {
    case 'items/itemsLoaded': {
      console.log('[ACTION: items/itemsLoaded] Items loaded');
      // Overloaded current state with new items list
      return action.payload;
    }
    case 'items/itemAdded': {
      console.log(`[ACTION: items/itemAdded] Adding item with content ${action.payload}`);
      // Appending the new item
      return [...state, action.payload];
    }
    case 'items/itemDeleted': { // TODO
      const { id } = action.payload;
      console.log(`[ACTION: items/itemDeleted] Deleting item with id=${id}`);
      return state;
    }
    default: {
      return state;
    }
  }
};
