const initialState = {
  editing: false, // Indicates if the inventory is currently in edit mode
  editedItems: {}, // Object which contains new values for any edited items
  deletedItems: [], // List of item IDs to delete
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Adding a new item edit
    case 'edits/addItemEdit': {
      console.log(`[ACTION: edits/addItemEdit] Item edit added, id: ${action.payload.id}, newValues: ${action.payload.newValues}`);
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
      console.log('[ACTION: edits/addItemDelete] Item delete added');
      return {
        ...state,
        deletedItems: [...state.deletedItems, action.payload.id],
      };
    }
    // Adding a new category delete
    case 'edits/addCategoryDelete': {
      // TODO
      console.log('[ACTION: edits/addCategoryDelete] Category delete added');
      return state;
    }
    // Set editing to true
    case 'edits/startEdits': {
      console.log('[ACTION: edits/startEdits] Edit started');
      return {
        ...state,
        editing: true,
      };
    }
    // Saving all edits
    case 'edits/saveEdits': {
      console.log('[ACTION: edits/saveEdits] Edits saved');
      return {
        ...state,
        editing: false,
      };
    }
    // Canceling all edits
    // Resets editedItems, deletedItems to empty values
    case 'edits/cancelEdits': {
      console.log('[ACTION: edits/cancelEdits] Edits canceled');
      return {
        ...state,
        editing: false,
        editedItems: {},
        deletedItems: [],
      };
    }
    default: {
      return state;
    }
  }
};
