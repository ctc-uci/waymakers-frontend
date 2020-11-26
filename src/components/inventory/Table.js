import React, { useEffect, useState } from 'react';
import EditableItem from './EditableItem';

// TODO:
// X Make handleClick async:
//    X Server might be getting the changes before the user is finished typing
// - Fix issue with cancel not reverting
// X Fix issue with deleted items still appearing until refresh
// - Add ascending and descending sort to table (currently sorted by id)
// - Improve CSS styling:
//    - Better positioning for buttons
//    - Mark unsaved edits with orange outline and icon
//    - Add strike-through for unsaved deleted

const Table = (prop) => {
  const [items, setItems] = useState(prop.items);
  const [editing, setEditing] = useState(false);

  // Object to store edits made to table
  // Passed to each row, and appended to when a change is made
  const [edits] = useState({ updated: {}, deleted: [] });

  useEffect(() => {
    setItems(prop.items);
  }, [prop]);

  // Sends edits once saved
  const saveEdits = async () => {
    // Updating edited values
    Object.keys(edits.updated).forEach(async (id) => {
      console.log(id, edits.updated[id]);
      try {
        await fetch(`http://localhost:3000/inventory/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(edits.updated[id]),
        });
      } catch (err) {
        console.log(err.message);
      }
    });

    // Deleting items
    edits.deleted.forEach(async (id) => {
      try {
        await fetch(`http://localhost:3000/inventory/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (err) {
        console.log(err.message);
      }
    });

    // Removing deleted items from item state variable
    setItems(items.filter((item) => !edits.deleted.includes(item.id)));
  };

  // Handles button presses
  const handleClick = (e) => {
    console.log('Button Clicked: ', e.target.id);
    if (e.target.id === 'save-edit') {
      console.log('Saving edit');
      saveEdits();
    } else if (e.target.id === 'cancel-edit') {
      console.log('Canceling edit');
    }
    setEditing(!editing);
  };

  // TODO REMOVE
  const testFunc = () => {
    console.log('Printing prop.items: ', prop.items);
    console.log('Printing items: ', items);
  };

  // Splits "Edit" button into "Cancel" and "Save" buttons
  const EditButton = () => {
    const editButtonPair = (
      <div>
        <button type="button" id="cancel-edit" onClick={handleClick}>
          Cancel
        </button>
        <button type="button" id="save-edit" onClick={handleClick}>
          Save
        </button>
      </div>
    );
    const editButton = (
      <button type="button" id="start-edit" onClick={handleClick}>
        Edit
      </button>
    );
    return editing ? editButtonPair : editButton;
  };

  return (
    <div className="table">
      <EditButton />
      <table className="table mt-5 text-center">
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
              />
            ))}
        </tbody>
      </table>
      <button type="button" id="testButton" onClick={testFunc}>
        Testing Button
      </button>
    </div>
  );
};

export default Table;
