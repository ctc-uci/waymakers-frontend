const initialState = {
  divisionsList: { // Object with all divisions
    '-1': {
      id: -1,
      div_name: 'All Divisions',
    },
  },
  // Object with all warehouses connected to the current division
  warehouseList: {},
};

// Handles the logic of updating the state
// depending on which action was dispatched
export default (state = initialState, action) => {
  switch (action.type) {
    case 'divisions/divisionsLoaded': {
      return {
        ...state,
        divisionsList: {
          ...state.divisionsList,
          ...action.payload,
        },
      };
    }
    case 'divisions/loadWarehouses': {
      return {
        ...state,
        warehouseList: {
          ...action.payload,
        },
      };
    }
    case 'divisions/divisionAdded': {
      // Overload the current state with a new state that includes the added division
      return {
        ...state,
        divisionsList: {
          ...state.divisionsList,
          ...action.payload,
        },
      };
    }
    case 'divisions/warehouseAdded': {
      return {
        ...state,
        warehouseList: {
          ...state.warehouseList,
          ...action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
};
