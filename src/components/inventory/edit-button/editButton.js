import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { startEdits, saveEdits, cancelEdits } from '../redux/actions';
import { getEditing } from '../redux/selectors';
import './editButton.css';

const EditButton = () => {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    if (e.target.id === 'start-edit') {
      dispatch(startEdits());
    } else if (e.target.id === 'save-edit') {
      dispatch(saveEdits());
    } else if (e.target.id === 'cancel-edit') {
      dispatch(cancelEdits());
    }
  };

  const editButtonPair = (
    <div className="edit-button-pair">
      <button type="button" id="save-edit" className="edit-button" onClick={handleClick}>
        <span className="save-edits-icon" />
        Save
      </button>
      <button type="button" id="cancel-edit" className="edit-button" onClick={handleClick}>
        Cancel
      </button>
    </div>
  );

  const editButton = (
    <button type="button" id="start-edit" className="edit-button" onClick={handleClick}>
      <span className="start-edits-icon" />
      Edit
    </button>
  );

  return useSelector(getEditing) ? editButtonPair : editButton;
};

export default EditButton;
