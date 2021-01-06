import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { deleteItem, editItem } from '../redux/actions';
import { getEditing, getCategories } from '../redux/selectors';
import store from '../redux/store';

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

  // Used to update css class of unsaved edits
  const [modified, setModified] = useState(false);

  // Used to update css class of unsaved delete
  const [deleted, setDeleted] = useState(false);

  // Appends to edits object at every change
  // This could probably be changed to only update once
  const updateEdits = () => {
    console.log(props.item.id);
    store.dispatch(editItem(props.item.id, fieldState));
    setModified(false);
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
    // and table is in edit mode
    if (modified && props.editing) {
      console.log(props.editing);
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
      <td>{fieldState.name}</td>
      <td>{fieldState.quantity}</td>
      <td>{fieldState.needed}</td>
      <td>{getCategoryLabelFromID(fieldState.category)}</td>
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
          className="form-control"
          value={fieldState.name}
          form={props.item.id}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          name="quantity"
          type="number"
          className="form-control"
          value={fieldState.quantity}
          form={props.item.id}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          name="needed"
          type="number"
          className="form-control"
          value={fieldState.needed}
          form={props.item.id}
          onChange={handleChange}
        />
      </td>
      <td>
        <select
          id="categories"
          name="category"
          className="form-control"
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
              <option value={cat.id}>{cat.label}</option>
            ))}
        </select>
      </td>
      <td>
        <button type="button" className="btn btn-outline-danger" onClick={deleteHandler}>Delete</button>
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
