import React, { useState } from 'react';
import Modal from 'react-modal';
import store from '../redux/store';
import { addCategory } from '../redux/actions';
import './addCategory.css';

// TO DO 1: figure out how to make the category actually send to the backend thru redux ahaha
// TO DO 2: ask design team how adding an item/category should look beyond the buttons
// TO DO 3: make this component only available when in edit mode

Modal.setAppElement('#root');
const AddCategoryButton = () => {
  const [popup, setPopup] = useState(false);
  const [category, setCategory] = useState('');

  console.log(category);

  const handleOnSubmit = () => {
    // create an add category action
    store.dispatch(addCategory({
      category,
    }));
  };

  return (
    <div>
      <button type="button" className="add-category-button" onClick={() => setPopup(true)}>+</button>
      <>
        <Modal
          className="add-category-popup"
          isOpen={popup}
          onRequestClose={() => setPopup(false)}
          style={{ size: '100px' }}
        >
          <button type="button" className="close-category" onClick={() => setPopup(false)}>x</button>
          <form className="add-category-form" onSubmit={handleOnSubmit}>
            <input
              type="text"
              id="add-category-input"
              name="add-category-input"
              placeholder="Category Name"
              onChange={(e) => setCategory(e.target.value)}
            />
            <button type="submit" id="submit-button">Add Category</button>
          </form>
        </Modal>
      </>
    </div>
  );
};

export default AddCategoryButton;
