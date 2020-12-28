// Initial state populated with sample values
const initialState = {
  0: {
    name: 'initialState First Item',
    quantity: -1,
    needed: -1,
    div_num: -1,
    category_id: -1,
  },
};

/* Sample ADD_ITEM action
{
  type: 'ADD_ITEM',
  payload: {
    id: 10,
    content: {name: 'newItem', quantity: 6, needed: 9, div_num: 0, category_id: 0}
  }
}
*/

// TODO:
// - Implement Thunk middleware

// Handles the logic of updating the state
// depending on which action was dispatched
export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { id, content } = action.payload;
      console.log(`[ACTION: ADD_ITEM] Adding item with id=${id} and content ${content}`);
      return {
        ...state,
        [id]: content,
      };
    }
    case 'DELETE_ITEM': { // TODO
      const { id } = action.payload;
      console.log(`[ACTION: DELETE_ITEM] Deleting item with id=${id}`);
      return state;
    }
    default: {
      return state;
    }
  }
};
