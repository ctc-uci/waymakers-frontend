import React, { useState } from 'react';
import Modal from 'react-modal';
import AddItem from './addItem';

import './addItem.css';

// this is a pop up window that allows users to add items and categories
// this component is currently used in Table.js, not inventory.js
// the "Add Item" button/modal are only available when in edit view
Modal.setAppElement('#root');
const AddItemModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div>
      <button type="button" className="add-item-button" onClick={() => setModalIsOpen(true)}>Add Item</button>
      <div>
        <Modal
          className="add-item-modal-content"
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <AddItem />
          <button type="button" className="close-add-item" onClick={() => setModalIsOpen(false)}>Close</button>
        </Modal>
      </div>
    </div>
  );
};

export default AddItemModal;
