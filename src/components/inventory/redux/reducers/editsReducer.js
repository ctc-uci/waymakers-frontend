const initialState = {
  editing: false, // Indicates if the inventory is currently in edit mode
  editedItems: {}, // Object which contains new values for any edited items
  editedDivisions: {}, // Object which contains new values for any edited divisions
  editedWarehouses: {}, // Object which contains new values for any edited warehouses
  deletedItems: [], // List of item IDs to delete
  deletedCategories: [], // List of category IDs to delete
  deletedDivisions: [], // List of division IDs to delete
  deletedWarehouses: [], // List of warehouse IDs to delete
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
    case 'edits/addDivisionEdit': {
      const { id, newValues } = action.payload;
      return {
        ...state,
        editedDivisions: {
          ...state.editedDivisions,
          [id]: { ...newValues },
        },
      };
    }
    case 'edits/addDivisionDelete': {
      return {
        ...state,
        deletedDivisions: [...state.deletedDivisions, action.payload.id],
      };
    }
    case 'edits/revertDivisionDelete': {
      const toBeReverted = action.payload.id.toString();
      const index = state.deletedDivisions.indexOf(toBeReverted);
      console.log(index, toBeReverted, state.deletedDivisions);
      if (index > -1) {
        return {
          ...state,
          deletedDivisions: state.deletedDivisions
            .filter((divId) => divId.toString() !== toBeReverted.toString()),
        };
      }
      return state;
    }
    case 'edits/addWarehouseEdit': {
      const { id, newValues } = action.payload;
      return {
        ...state,
        editedWarehouses: {
          ...state.editedWarehouses,
          [id]: { ...newValues },
        },
      };
    }
    case 'edits/addWarehouseDelete': {
      return {
        ...state,
        deletedWarehouses: [...state.deletedWarehouses, action.payload.id],
      };
    }
    case 'edits/revertWarehouseDelete': {
      const toBeDeleted = action.payload.id;
      const index = state.deletedWarehouses.indexOf(action.payload.id);
      if (index > -1) {
        return {
          ...state,
          deletedWarehouses: state.deletedWarehouses
            .filter((wareId) => wareId.toString() !== toBeDeleted.toString()),
        };
      }
      return state;
    }
    // Edits have been saved
    case 'edits/editsSaved': {
      return {
        ...state,
        editing: false,
        editedItems: {},
        editedDivisions: {},
        editedWarehouses: {},
        deletedItems: [],
        deletedCategories: [],
        deletedDivisions: [],
        deletedWarehouses: [],
      };
    }
    // Canceling all edits
    // Resets editedItems, deletedItems to empty values
    case 'edits/cancelEdits': {
      return {
        editing: false,
        editedItems: {},
        editedDivisions: {},
        editedWarehouses: {},
        deletedItems: [],
        deletedCategories: [],
        deletedDivisions: [],
        deletedWarehouses: [],
      };
    }
    default: {
      return state;
    }
  }
};
