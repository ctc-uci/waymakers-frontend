const initialState = {
  editing: false,
  editedItems: {},
  deletedItems: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Adding a new item edit
    case 'edits/addItemEdit': {
      console.log('[ACTION: edits/addItemEdit] Item edit added');
      return state;
    }
    // Adding a new item delete
    case 'edits/addItemDelete': {
      console.log('[ACTION: edits/addItemDelete] Item delete added');
      return {
        ...state,
        deletedItems: [...state.deletedItems, action.payload],
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
    case 'edits/cancelEdits': {
      console.log('[ACTION: edits/cancelEdits] Edits canceled');
      return {
        ...state,
        editing: false,
      };
    }
    default: {
      return state;
    }
  }
};
