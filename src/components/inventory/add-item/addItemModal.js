import React, { useState } from 'react';
import Modal from 'react-modal';
import AddItem from './addItem';

import './addItemModal.css';

// this is a pop up window that allows users to add items and categories
// this component is currently used in Table.js, not inventory.js
// the "Add Item" button/modal are only available when in edit view
Modal.setAppElement('#root');
const AddItemModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div>
      <button type="button" className="btn btn-outline-primary" onClick={() => setModalIsOpen(true)}>Add Item</button>
      <div>
        <Modal
          className="add-item-modal-content"
          overlayClassName="add-item-modal-overlay"
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <AddItem />
          <button type="button" className="btn btn-outline-primary" onClick={() => setModalIsOpen(false)}>Close</button>
        </Modal>
      </div>
    </div>
  );
};

export default AddItemModal;
