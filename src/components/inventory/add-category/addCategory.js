import React, { useState } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import store from '../redux/store';
import { addCategory } from '../redux/actions';
import { getCategories } from '../redux/selectors';
import './addCategory.css';

Modal.setAppElement('#root');
const AddCategoryButton = () => {
  const [popup, setPopup] = useState(false);
  const [label, setLabel] = useState('');

  const handleOnSubmit = () => {
    // create an add category action
    store.dispatch(addCategory({
      label,
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
              className="add-category-input"
              name="add-category-input"
              placeholder="Category Name"
              onChange={(e) => setLabel(e.target.value)}
            />
            <button type="submit" className="submit-button">Add Category</button>
          </form>
        </Modal>
      </>
    </div>
  );
};

// Connecting component props to redux state
const mapStateToProps = (state) => ({
  categories: getCategories(state),
});

export default connect(mapStateToProps, null)(AddCategoryButton);
