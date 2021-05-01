import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { addCategory } from '../redux/actions';
import { getCategories } from '../redux/selectors';
import { LightModal } from '../../../common/LightModal';
import './addCategory.css';

const AddCategoryButton = () => {
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(false);
  const [label, setLabel] = useState('');

  const handleOnSubmit = () => {
    // create an add category action
    dispatch(addCategory({
      label,
    }));
  };

  return (
    <div className="add-category">
      <button type="button" className="add-category-button" onClick={() => setPopup(true)}>+</button>
      {/* Popup form for when button is clicked */}
      <LightModal
        className="add-category-popup"
        isOpen={popup}
        onRequestClose={() => setPopup(false)}
      >
        <form className="add-category-form" onSubmit={handleOnSubmit}>
          <p className="add-category-title">Create new category?</p>
          <input
            type="text"
            className="add-category-input"
            name="add-category-input"
            placeholder="Category Name"
            onChange={(e) => setLabel(e.target.value)}
          />
          <div className="confirmation">
            <button type="button" className="category-form-button" onClick={() => setPopup(false)}>Cancel</button>
            <button type="submit" className="category-form-button submit-category">Yes</button>
          </div>
        </form>
      </LightModal>
    </div>
  );
};

// Connecting component props to redux state
const mapStateToProps = (state) => ({
  categories: getCategories(state),
});

export default connect(mapStateToProps, null)(AddCategoryButton);
