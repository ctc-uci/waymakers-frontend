import React from 'react';
import { useSelector } from 'react-redux';

import store from '../redux/store';
import { startEdits, saveEdits, cancelEdits } from '../redux/actions';
import { getEditing } from '../redux/selectors';
import './editButton.css';

const EditButton = () => {
  const handleClick = (e) => {
    if (e.target.id === 'start-edit') {
      store.dispatch(startEdits());
    } else if (e.target.id === 'save-edit') {
      store.dispatch(saveEdits());
    } else if (e.target.id === 'cancel-edit') {
      store.dispatch(cancelEdits());
    }
  };

  const editButtonPair = (
    <div className="edit-button-wrapper">
      <button type="button" id="save-edit" className="save-button" onClick={handleClick}>
        Save
      </button>
      <button type="button" id="cancel-edit" className="cancel-button" onClick={handleClick}>
        Cancel
      </button>
    </div>
  );

  const editButton = (
    <button type="button" id="start-edit" className="edit-button" onClick={handleClick}>
      Edit
    </button>
  );

  return useSelector(getEditing) ? editButtonPair : editButton;
};

export default EditButton;
