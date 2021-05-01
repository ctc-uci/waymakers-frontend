import React, { useState } from 'react';
// import Modal from 'react-modal';
import AddItem from './addItem';
import { LightModal } from '../../../common/LightModal';

import './addItem.css';

// this is a pop up window that allows users to add items and categories
// this component is currently used in Table.js, not inventory.js
// the "Add Item" button/modal are only available when in edit view
// Modal.setAppElement('#root');
const AddItemModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <>
      <button type="button" className="add-item-button" onClick={() => setModalIsOpen(true)}>
        <p className="large" style={{ margin: 0, padding: 0 }}>
          <span className="add-item-plus">+</span>
          Add Item
        </p>
      </button>
      <LightModal
        className="add-item-popup"
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <AddItem
          setIsOpen={setModalIsOpen}
        />
      </LightModal>
    </>
  );
};

export default AddItemModal;
