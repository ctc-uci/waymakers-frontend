import React, { useState } from 'react';
import Modal from 'react-modal';
import AddItem from './AddItem';

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
          style={{
            overlay: {
              position: 'fixed',
              top: 200,
              left: 500,
              right: 500,
              bottom: 200,
            },
            content: {
              position: 'absolute',
              top: '40px',
              left: '40px',
              right: '40px',
              bottom: '40px',
              border: '1.6px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '20px',
            },
          }}
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
