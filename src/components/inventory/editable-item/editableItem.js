import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

import store from '../redux/store';
import { deleteItem, editItem, undeleteItem } from '../redux/actions';
import { getEditing, getCategories } from '../redux/selectors';

import './editableItem.css';

const getCategoryLabelFromID = (id) => {
  const category = useSelector(getCategories).find((cat) => cat.id === id);
  return category ? category.label : '';
};

// Converts table rows into forms when in Edit mode
const EditableItem = (props) => {
  // State variable for all editable fields
  const originalCategory = props.item.category_id;
  const [fieldState, setFieldState] = useState({
    name: props.item.name,
    quantity: props.item.quantity,
    needed: props.item.needed,
    category: originalCategory,
  });

  // Used to update css class of unsaved edits
  const [modified, setModified] = useState(false);

  // Used to update css class of unsaved delete
  const [deleted, setDeleted] = useState(false);

  // Appends to edits object at every change
  // This could probably be changed to only update once
  const updateEdits = () => {
    store.dispatch(editItem(props.item.id, fieldState));
    setModified(false);
  };

  // Adds item id to list of items to be deleted
  const deleteHandler = () => {
    if (!deleted) {
      store.dispatch(deleteItem(props.item.id));
      setDeleted(true);
    } else {
      store.dispatch(undeleteItem(props.item.id));
      setDeleted(false);
    }
  };

  // Updates text fields when editing
  const handleChange = (e) => {
    setModified(true);
    const { name, value } = e.target;

    setFieldState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Decrement field value

  const incrementField = (e) => {
    setModified(true);
    const { name } = e.target;

    setFieldState((prevState) => ({
      ...prevState,
      [name]: prevState.[name] + 1,
    }));
  };

  // Increment field value

  const decrementField = (e) => {
    setModified(true);
    const { name } = e.target;

    setFieldState((prevState) => ({
      ...prevState,
      [name]: prevState.[name] - 1,
    }));
  };

  // Sets field state on component mount
  useEffect(() => {
    setFieldState(fieldState);
  }, []);

  // Updating values when editing
  useEffect(() => {
    setFieldState(fieldState);
    // Only update edits if user has modified values
    // and table is in edit mode
    if (modified && props.editing) {
      updateEdits();
    }
  }, [fieldState]);

  // Reset field values once edit canceled
  useEffect(() => {
    setFieldState({
      name: props.item.name,
      quantity: props.item.quantity,
      needed: props.item.needed,
      category: props.item.category_id,
    });
    setDeleted(false);
  }, [props.item, useSelector(getEditing)]);

  // Static row to display when not in Edit mode
  const staticItem = (
    <tr className="static-table-row">
      <td className="static-item-name">{fieldState.name}</td>
      <td className="static-item-attribute">{fieldState.quantity}</td>
      <td className="static-item-attribute">{fieldState.needed}</td>
      <td className="static-item-attribute">{getCategoryLabelFromID(fieldState.category)}</td>
    </tr>
  );

  // Form is created in first column of each row, then each
  // column has an input that uses that form
  const formItem = (
    // CSS class to indicate that value has been changed
    <tr className="edit-table-row">
      <td className="item-edit-name">
        {deleted ? <strike className="deleted-item--name">{fieldState.name}</strike> : (
          <input
            name="name"
            type="text"
            className="table-input-name"
            value={fieldState.name}
            form={props.item.id}
            onChange={handleChange}
          />
        )}
      </td>
      <td className="item-qty-field">
        <div className="change-quantity-wrapper">
          {deleted ? <strike className="deleted-item">{fieldState.quantity}</strike> : (
            <div className="change-quantity-wrapper">
              <div className="minus-button-wrapper">
                <button
                  type="button"
                  name="quantity"
                  aria-label="minus"
                  className="item-edit-minus-button"
                  form={props.item.id}
                  onClick={decrementField}
                >
                  -
                </button>
              </div>
              <input
                name="quantity"
                type="number"
                className="table-input"
                value={fieldState.quantity}
                form={props.item.id}
                onChange={handleChange}
              />
              <div className="plus-button-wrapper">
                <button
                  type="button"
                  name="quantity"
                  aria-label="plus"
                  className="item-edit-plus-button"
                  form={props.item.id}
                  onClick={incrementField}
                >
                  +
                </button>
              </div>
            </div>
          )}
        </div>
      </td>
      <td className="item-needed-field">
        <div className="change-quantity-wrapper">
          {deleted ? <strike className="deleted-item">{fieldState.needed}</strike> : (
            <div className="change-quantity-wrapper">
              <div className="minus-button-wrapper">
                <button
                  type="button"
                  name="needed"
                  aria-label="-"
                  className="item-edit-minus-button"
                  form={props.item.id}
                  onClick={decrementField}
                >
                  -
                </button>
              </div>
              <input
                name="needed"
                type="number"
                className="table-input"
                value={fieldState.needed}
                form={props.item.id}
                onChange={handleChange}
              />
              <div className="plus-button-wrapper">
                <button
                  type="button"
                  name="needed"
                  aria-label="+"
                  className="item-edit-plus-button"
                  form={props.item.id}
                  onClick={incrementField}
                >
                  +
                </button>
              </div>
            </div>
          )}
        </div>
      </td>
      <td className="item-cat-field">
        <div className="change-quantity-wrapper">
          {deleted
            ? (
              // Calling getCategory to ensure hook is always called so there is no rendering issue
              <strike className="deleted-item">
                {getCategoryLabelFromID(originalCategory)}
              </strike>
            )
            : (
              <div className="change-quantity-wrapper">
                <select
                  id="categories"
                  name="category"
                  className="category-dropdown"
                  value={fieldState.category}
                  form={props.item.id}
                  onChange={handleChange}
                >
                  <option value="">No category</option>
                  {/* Creating dropdown menu items from categories list */}
                  {/* category.label is displayed, but the value of the option will be the ID */}
                  {useSelector(getCategories)
                    .filter((cat) => cat.id > 0)
                    .map((cat) => (
                      <option key={props.item.id} value={cat.id}>{cat.label}</option>
                    ))}
                </select>
              </div>
            )}
        </div>
      </td>
      <td>
        <div id="delete-wrapper">
          <button
            type="button"
            aria-label="delete"
            className={deleted ? 'table-item-undelete-button' : 'table-item-delete-button'}
            onClick={deleteHandler}
          />
        </div>
      </td>
    </tr>
  );

  // Decides which table row to show, dependant on edit mode
  return props.editing ? formItem : staticItem;
};

// Connecting component props to redux state
const mapStateToProps = (state, ownProps) => ({
  editing: getEditing(state),
  key: ownProps.key,
  item: ownProps.item,
  modified: ownProps.modified,
});

export default connect(mapStateToProps, null)(EditableItem);
