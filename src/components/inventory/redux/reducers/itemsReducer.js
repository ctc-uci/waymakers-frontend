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
      // Overriding the current itemsList with the new one
      return {
        ...state,
        itemsList: action.payload,
      };
    }
    case 'items/itemAdded': {
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
