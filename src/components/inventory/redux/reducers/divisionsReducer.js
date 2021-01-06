const initialState = [{
  id: -1,
  div_name: 'All Divisions',
}];

// Handles the logic of updating the state
// depending on which action was dispatched
export default (state = initialState, action) => {
  switch (action.type) {
    case 'divisions/divisionsLoaded': {
      return [...state, ...action.payload];
    }
    default: {
      return state;
    }
  }
};
