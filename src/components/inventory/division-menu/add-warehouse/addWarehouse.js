import React, { useState } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import store from '../../redux/store';
import { addWarehouse } from '../../redux/actions';
import { getWarehouses } from '../../redux/selectors';
import './addWarehouse.css';

Modal.setAppElement('#root');
const AddWarehouseButton = () => {
  const [popup, setPopup] = useState(false);
  const [warehouse, setWarehouse] = useState('');

  const handleOnSubmit = () => {
    // create an add warehouse action
    store.dispatch(addWarehouse({
      warehouseLabel: warehouse,
      // get currently selected division and put it here v
      // TO DO: set the division to whatever division is currently selected
      division: 1,
    }));
  };

  return (
    <div className="add-warehouse-button-wrapper">
      <button type="button" className="add-warehouse-button" onClick={() => setPopup(true)}>+</button>
      <>
        <Modal
          className="add-warehouse-popup"
          isOpen={popup}
          onRequestClose={() => setPopup(false)}
          style={{ size: '100px' }}
        >
          <button type="button" className="close-warehouse" onClick={() => setPopup(false)}>x</button>
          <form className="add-warehouse-form" onSubmit={handleOnSubmit}>
            <input
              type="text"
              id="add-warehouse-input"
              name="add-warehouse-input"
              placeholder="Warehouse Name"
              onChange={(e) => setWarehouse(e.target.value)}
            />
            <button type="submit" id="submit-button">Add Warehouse</button>
          </form>
        </Modal>
      </>
    </div>
  );
};

// Connecting component props to redux state
const mapStateToProps = (state) => ({
  categories: getWarehouses(state),
});

export default connect(mapStateToProps, null)(AddWarehouseButton);
