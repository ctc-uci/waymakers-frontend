const initialState = [];

// Handles the logic of updating the state
// depending on which action was dispatched
export default (state = initialState, action) => {
  switch (action.type) {
    case 'divisions/divisionsLoaded': {
      return [{ id: -1, div_name: 'All Divisions' }].concat(action.payload);
    }
    case 'divisions/divisionAdded': {
      // Overload the current state with a new state that includes the added division
      return [...state, ...action.payload];
    }
    default: {
      return state;
    }
  }
};
