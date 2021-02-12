import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

import store from '../redux/store';
import { deleteItem, editItem } from '../redux/actions';
import { getEditing, getCategories } from '../redux/selectors';

import './editableItem.css';

// BUG TO FIX: undoing a delete on an item (need to create a redux action?)

const getCategoryLabelFromID = (id) => {
  const category = useSelector(getCategories).find((cat) => cat.id === id);
  return category ? category.label : '';
};

// Converts table rows into forms when in Edit mode
const EditableItem = (props) => {
  // State variable for all editable fields
  const [fieldState, setFieldState] = useState({
    name: props.item.name,
    quantity: props.item.quantity,
    needed: props.item.needed,
    category: props.item.category_id,
  });

  // Used to indicate whether an item is deleted or not (BUGGED FUNCTIONALITY)
  const [buttonOpacity, setButtonOpacity] = useState(1.0);

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
      setButtonOpacity(0.7);
    } else {
      // TO DO: undo item deletion (BUG)
      setDeleted(false);
      setButtonOpacity(1.0);
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
    <tr>
      <td className="item-name">{fieldState.name}</td>
      <td className="item-qty">{fieldState.quantity}</td>
      <td className="item-needed">{fieldState.needed}</td>
      <td className="item-cat">{getCategoryLabelFromID(fieldState.category)}</td>
    </tr>
  );

  // Form is created in first column of each row, then each
  // column has an input that uses that form
  const formItem = (
    // CSS class to indicate that value has been changed
    // TODO: Add a separate css class for deleted items
    <tr className={modified ? 'modified' : null}>
      <td className="item-name-field">
        <form id={props.item.id} />
        <input
          name="name"
          type="text"
          className="item-edit-name"
          value={fieldState.name}
          form={props.item.id}
          onChange={handleChange}
        />
      </td>
      <td className="item-qty-field">
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
          className="item-edit-qty"
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
      </td>
      <td className="item-needed-field">
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
          className="item-edit-needed"
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
      </td>
      <td className="item-cat-field">
        <select
          id="categories"
          name="category"
          className="item-edit-cat"
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
      </td>
      <td>
        <div id="delete-wrapper">
          <button
            type="button"
            aria-label="delete"
            className="table-item-delete-button"
            onClick={deleteHandler}
            style={{ opacity: buttonOpacity }}
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
