/*
Sample element for itemList
  {
    "id": 0,
    "name": "sampleItem",
    "quantity": -1,
    "needed": -1,
    "div_num": -1,
    "category_id": -1
  }
*/

// Initial state populated with sample values
const initialState = {
  itemsList: [], // List of item objects
  selectedDivision: null, // ID of the selected division
  selectedCategory: null, // ID of the selected category
  searchTerm: '', // String value of the current search term
};

// Handles the logic of updating the state
// depending on which action was dispatched
export default (state = initialState, action) => {
  switch (action.type) {
    case 'items/itemsLoaded': {
      console.log('[ACTION: items/itemsLoaded] Items loaded');
      // Overriding the current itemsList with the new one
      return {
        ...state,
        itemsList: action.payload,
      };
    }
    case 'items/itemAdded': {
      console.log(`[ACTION: items/itemAdded] Adding item with content ${action.payload}`);
      // Appending the new item
      return {
        ...state,
        itemsList: [...state.itemsList, action.payload],
      };
    }
    case 'items/searchTermModified': {
      // Modifies the search term for the item state
      return {
        ...state,
        searchTerm: action.payload,
      };
    }
    case 'items/searchDivisionModified': {
      // Modifies the division to be searched (id) for the item state
      return {
        ...state,
        selectedDivision: action.payload,
      };
    }
    case 'items/searchCategoryModified': {
      // Modifies the category to be searched (id) for the item state
      return {
        ...state,
        selectedCategory: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
