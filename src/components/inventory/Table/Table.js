import React, { useEffect, useState } from 'react';
import EditableItem from '../EditableItem/EditableItem';

const axios = require('axios');

// TODO:
// X Make handleClick async:
//    X Server might be getting the changes before the user is finished typing
// X Fix issue with cancel not reverting
//    X Need to make sure item prop in Table is updated after a save
// X Fix issue with deleted items still appearing until refresh
// - Fix issue caused by:
//    - making and saving an edit,
//    - then going into edit again, then canceling
//    - table shows the original value
// - Add ascending and descending sort to table (currently sorted by id)
// - Improve CSS styling:
//    - Better positioning for buttons
//    - Mark unsaved edits with orange outline and icon
//    - Add strike-through for unsaved deleted

const Table = (prop) => {
  const [items, setItems] = useState(prop.items);
  // Used to set Table to editable
  const [editing, setEditing] = useState(false);
  // Used to cancel edits made
  const [canceled, setCanceled] = useState(false);

  // Object to store edits made to table
  // Passed to each row, and appended to when a change is made
  const [edits] = useState({ updated: {}, deleted: [] });

  useEffect(() => {
    setItems(prop.items);
  }, [prop]);

  // Sends edits once saved
  const saveEdits = async () => {
    // Deleting items first
    const deletePromises = [];
    // Populating list of DELETE requests
    edits.deleted.forEach(async (id) => {
      deletePromises.push(
        axios.delete(`http://localhost:3000/inventory/${id}`),
      );
    });
    // Perform all DELETE requests concurrently
    Promise.all(deletePromises).catch((error) => { console.error(error); });

    // Updating edited values
    const editPromises = [];
    // Populating list of PUT requests
    console.log('edits.updated():', edits.updated);
    Object.keys(edits.updated).forEach(async (id) => {
      editPromises.push(
        axios.put(`http://localhost:3000/inventory/${id}`, edits.updated[id]),
      );
    });
    // Perform all PUT requests concurrently
    Promise.all(editPromises).catch((error) => { console.error(error); });

    // Removing deleted items from item state variable
    setItems(items.filter((item) => !edits.deleted.includes(item.id)));
    // Retrieving updated values from server
    prop.getItems();
  };

  // Handles button presses
  const handleClick = (e) => {
    console.log('Button Clicked: ', e.target.id);
    if (e.target.id === 'save-edit') {
      console.log('Saving edit');
      saveEdits();
    } else if (e.target.id === 'cancel-edit') {
      console.log('Canceling edit');
      setCanceled(!canceled);
    }
    setEditing(!editing);
  };

  // Splits "Edit" button into "Cancel" and "Save" buttons
  const EditButton = () => {
    const editButtonPair = (
      <div>
        <button type="button" id="save-edit" className="btn btn-outline-success" onClick={handleClick}>
          Save
        </button>
        <button type="button" id="cancel-edit" className="btn btn-outline-danger" onClick={handleClick}>
          Cancel
        </button>
      </div>
    );
    const editButton = (
      <button type="button" id="start-edit" className="btn btn-outline-primary" onClick={handleClick}>
        Edit
      </button>
    );
    return editing ? editButtonPair : editButton;
  };

  return (
    <div className="table">
      <div className="mt-3">
        <EditButton />
      </div>
      <table className="table mt-3 text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>In stock</th>
            <th>Number needed</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {items
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((item) => (
              <EditableItem
                key={item.id}
                item={item}
                edits={edits}
                editable={editing}
                modified={false}
                canceled={canceled}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
