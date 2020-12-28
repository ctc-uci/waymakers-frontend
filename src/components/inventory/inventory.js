import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import InventoryApp from './inventoryApp';

// Creates an independent store for the inventory "sub-app"
// Read more here: https://redux.js.org/recipes/isolating-redux-sub-apps
class Inventory extends Component {
  constructor(props) {
    super(props);
    this.store = store;
  }

  render() {
    return (
      <Provider store={this.store}>
        <InventoryApp />
      </Provider>
    );
  }
}

export default Inventory;
