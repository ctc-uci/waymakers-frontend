import React, { useState, useEffect, useRef } from 'react';

// Converts table rows into forms when in Edit mode
const EditableItem = (props) => {
  // State variable for all editable fields
  const [fieldState, setFieldState] = useState({
    name: props.item.name,
    quantity: props.item.quantity,
    needed: props.item.needed,
    category: props.item.category,
  });

  // Tracks edits made, used in Table.js to send
  // updates to server
  const [edits] = useState(props.edits);

  // Used to update css class of unsaved edits
  const [modified, setModified] = useState(props.modified);

  // Appends to edits object at every change
  // This could probably be changed to only update once
  const updateEdits = () => {
    edits.updated[props.item.id] = {
      name: fieldState.name,
      quantity: fieldState.quantity,
      needed: fieldState.needed,
      category: fieldState.category,
    };
  };

  // Adds item id to list of items to be deleted
  const deleteItem = () => {
    console.log('Deleting Item');
    props.edits.deleted.push(props.item.id);
    console.log(props.edits);
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

  const mounted = useRef();

  useEffect(() => {
    if (!mounted.current) {
      setFieldState(fieldState);
      mounted.current = true;
    } else {
      setFieldState(fieldState);
      updateEdits();
    }
  }, [fieldState]);

  // Row to display when not in Edit mode
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
        <button type="button" onClick={deleteItem}>Delete</button>
      </td>
    </tr>
  );

  // Decides which table row to show, dependant on edit mode
  return props.editable ? formItem : staticItem;
};

export default EditableItem;
