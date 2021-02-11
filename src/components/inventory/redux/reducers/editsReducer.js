const initialState = {
  editing: false, // Indicates if the inventory is currently in edit mode
  editedItems: {}, // Object which contains new values for any edited items
  deletedItems: [], // List of item IDs to delete
  deletedCategories: [], // List of category IDs to delete
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Adding a new item edit
    case 'edits/addItemEdit': {
      const { id, newValues } = action.payload;
      return {
        ...state,
        editedItems: {
          ...state.editedItems,
          [id]: { ...newValues },
        },
      };
    }
    // Adding a new item delete
    case 'edits/addItemDelete': {
      return {
        ...state,
        deletedItems: [...state.deletedItems, action.payload.id],
      };
    }
    // Undoing an item deletion
    case 'edits/revertItemDelete': {
      const index = state.deletedItems.indexOf(action.payload.id);
      if (index > -1) {
        state.deletedItems.splice(index, 1);
      }
      return state;
    }
    // Adding a new category delete
    case 'edits/addCategoryDelete': {
      return {
        ...state,
        deletedCategories: [...state.deletedCategories, action.payload.id],
      };
    }
    // Undoing a category delete
    case 'edits/revertCategoryDelete': {
      const index = state.deletedCategories.indexOf(action.payload.id);
      if (index > -1) {
        state.deletedCategories.splice(index, 1);
      }
      return state;
    }
    // Set editing to true
    case 'edits/startEdits': {
      return {
        ...state,
        editing: true,
      };
    }
    // Edits have been saved
    case 'edits/editsSaved': {
      return {
        ...state,
        editing: false,
        editedItems: {},
        deletedItems: [],
        deletedCategories: [],
      };
    }
    // Canceling all edits
    // Resets editedItems, deletedItems to empty values
    case 'edits/cancelEdits': {
      return {
        editing: false,
        editedItems: {},
        deletedItems: [],
        deletedCategories: [],
      };
    }
    default: {
      return state;
    }
  }
};
