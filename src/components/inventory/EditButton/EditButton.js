import React from 'react';
import { useSelector } from 'react-redux';
import { startEdits, saveEdits, cancelEdits } from '../redux/actions';
import { getEditing } from '../redux/selectors';
import store from '../redux/store';

const EditButton = () => {
  const handleClick = (e) => {
    console.log('Button Clicked: ', e.target.id);
    if (e.target.id === 'start-edit') {
      store.dispatch(startEdits());
    } else if (e.target.id === 'save-edit') {
      store.dispatch(saveEdits());
    } else if (e.target.id === 'cancel-edit') {
      store.dispatch(cancelEdits());
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

  return useSelector(getEditing) ? editButtonPair : editButton;
};

export default EditButton;
