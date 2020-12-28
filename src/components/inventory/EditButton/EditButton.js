import React from 'react';

const EditButton = (prop) => {
  const handleClick = (e) => {
    console.log('Button Clicked: ', e.target.id);
    if (e.target.id === 'start-edit') {
      console.log('Starting edit');
      prop.setEditState('editing');
    } else if (e.target.id === 'save-edit') {
      console.log('Saving edit');
      prop.setEditState('saved');
    } else if (e.target.id === 'cancel-edit') {
      console.log('Canceling edit');
      prop.setEditState('canceled');
    }
  };

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

  return prop.editState === 'editing' ? editButtonPair : editButton;
};

export default EditButton;
