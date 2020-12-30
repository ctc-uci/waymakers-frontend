import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { deleteItem, editItem } from '../redux/actions';
import { getEditing } from '../redux/selectors';
import store from '../redux/store';

// Converts table rows into forms when in Edit mode
const EditableItem = (props) => {
  // State variable for all editable fields
  const [fieldState, setFieldState] = useState({
    name: props.item.name,
    quantity: props.item.quantity,
    needed: props.item.needed,
    category: props.item.category,
  });

  // Used to update css class of unsaved edits
  const [modified, setModified] = useState(props.modified);

  // Used to update css class of unsaved delete
  const [deleted, setDeleted] = useState(false);

  // Appends to edits object at every change
  // This could probably be changed to only update once
  const updateEdits = () => {
    store.dispatch(editItem(props.item.id, fieldState));
  };

  // Adds item id to list of items to be deleted
  const deleteHandler = () => {
    if (!deleted) {
      store.dispatch(deleteItem(props.item.id));
      setDeleted(true);
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

  // Sets field state on component mount
  useEffect(() => {
    setFieldState(fieldState);
  }, []);

  // Updating values when editing
  useEffect(() => {
    setFieldState(fieldState);
    // Only update edits if user has modified values
    if (modified) {
      updateEdits();
    }
  }, [fieldState]);

  // Reset field values once edit canceled
  useEffect(() => {
    if (props.editState === 'canceled') {
      setFieldState({
        name: props.item.name,
        quantity: props.item.quantity,
        needed: props.item.needed,
        category: props.item.category,
      });
    }
  }, [props.editState]);

  // Static row to display when not in Edit mode
  const staticItem = (
    <tr>
      <td>{fieldState.name}</td>
      <td>{fieldState.quantity}</td>
      <td>{fieldState.needed}</td>
      <td>{fieldState.category}</td>
    </tr>
  );

  // Form is created in first column of each row, then each
  // column has an input that uses that form
  const formItem = (
    // CSS class to indicate that value has been changed
    // TODO: Add a separate css class for deleted items
    <tr className={modified ? 'modified' : null}>
      <td>
        <form id={props.item.id} />
        <input
          name="name"
          type="text"
          value={fieldState.name}
          form={props.item.id}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          name="quantity"
          type="number"
          value={fieldState.quantity}
          form={props.item.id}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          name="needed"
          type="number"
          value={fieldState.needed}
          form={props.item.id}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          name="category"
          type="text"
          value={fieldState.category}
          form={props.item.id}
          onChange={handleChange}
        />
      </td>
      <td>
        <button type="button" className="btn btn-outline-danger" onClick={deleteHandler}>Delete</button>
      </td>
    </tr>
  );

  // Decides which table row to show, dependant on edit mode
  return useSelector(getEditing) ? formItem : staticItem;
};

export default EditableItem;
