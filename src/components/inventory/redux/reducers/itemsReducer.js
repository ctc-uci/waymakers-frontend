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
  selectedDivision: -1, // ID of the selected division
  selectedCategoryID: null, // ID of the selected category
  selectedCategoryLabel: '', // Label of theselected category
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
        selectedDivision: action.payload.id,
      };
    }
    case 'items/categorySelected': {
      console.log(`[ACTION: items/categorySelected] Selecting category with id ${action.payload}`);
      return {
        ...state,
        selectedCategoryID: action.payload.newCategoryID,
        selectedCategoryLabel: action.payload.newCategoryLabel,
      };
    }
    default: {
      return state;
    }
  }
};
