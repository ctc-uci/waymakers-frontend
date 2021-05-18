/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { createAlert } from '../../../common/AlertBanner/AlertBannerSlice';

import {
  changeSelectedDivision,
  deleteDivision,
  undeleteDivision,
  changeSelectedWarehouse,
  editDivision,
} from '../redux/actions';
import {
  getEditing,
  getDeletedDivisionIDs,
  getEditedDivisionIDs,
  getDivisions,
} from '../redux/selectors';

import deleteIcon from '../../../assets/deleteIcon.svg';
import undoIcon from '../../../assets/undeleteIcon.svg';

import './divisionMenuItem.css';

const DivisionMenuItem = ({
  allDivisions,
  allDeletedDivisions,
  allEditedDivisions,
  currentlyEditing,
  divisionId,
  divisionName,
  open,
  setOpen,
  topLabel,
}) => {
  const dispatch = useDispatch();
  // Boolean stating whether or not the division has been edited
  const [modified, setModified] = useState(false);
  // Object containing division values
  const [fieldState, setFieldState] = useState({
    id: divisionId,
    name: divisionName,
  });
  // Boolean stating whether or not the division has been deleted
  const [deleted, setDeleted] = useState(false);
  // String that is visually displayed on the division menu dropdown
  const [divisionLabel, setDivisionLabel] = useState(divisionName);

  // When the dropdown menu is loaded, we have to visually show if each division is deleted
  const handleOnLoad = () => {
    let divisionDeleted = false;
    if (allDeletedDivisions) {
      divisionDeleted = allDeletedDivisions
        .filter((divId) => divId.toString() === divisionId.toString()).length > 0;
      setDeleted(divisionDeleted);
      if (divisionDeleted) {
        setDivisionLabel(<strike>{fieldState.name}</strike>);
      }
    }
    if (!divisionDeleted && allEditedDivisions) {
      if (divisionId in allEditedDivisions) {
        setFieldState({
          ...fieldState,
          name: allEditedDivisions[divisionId].name,
        });
        setDivisionLabel(allEditedDivisions[divisionId].name);
      } else {
        setDivisionLabel(divisionName);
      }
    }
  };
  // Called whenever a DivisionMenuItem is clicked
  const handleDivisionClick = (divId) => {
    if (topLabel) {
      setOpen(!open);
    } else {
      dispatch(changeSelectedDivision(parseInt(divId, 10)));
      dispatch(changeSelectedWarehouse(-1));
      setOpen(false);
    }
  };

  // Called whenever the division name is modified
  const handleDivisionInputChanged = (e) => {
    const targetLabel = e.target.value;
    if (targetLabel.length > 0) {
      setFieldState({
        ...fieldState,
        name: e.target.value,
      });
      setModified(true);
    } else {
      dispatch(createAlert({
        message: 'Division name can not be empty!',
        severity: 'error',
      }));
    }
  };

  // If the division is already deleted, undo the deletion
  // Otherwise add it to the list of divisions to delete once the save button is clicked
  const handleDeleteUndoButtonClicked = () => {
    if (deleted) {
      setDeleted(false);
      dispatch(undeleteDivision(divisionId.toString()));
    } else {
      setDeleted(true);
      dispatch(deleteDivision(divisionId.toString()));
    }
  };

  // Updates redux state with the new edited division
  // Called whenever the fieldState is modified (through useEffect below)
  const updateEdits = () => {
    if (currentlyEditing && modified) {
      dispatch(editDivision(divisionId, fieldState));
      setModified(false);
    }
  };

  // Every time a different division is clicked from thedropdown menu, update the fieldState
  useEffect(() => {
    setFieldState({
      id: divisionId,
      name: divisionName,
    });
  }, [divisionId, currentlyEditing]);

  // Check if the current division has been deleted
  //  If so, set divisionLabel to be the crossed out version of the edited divisionName
  //  OR the crossed out original divisionName if the div hasn't been edited
  //
  //  If not, check if the division has been edited
  //    If so, set divisionLabel to the edited field
  //    If not, divisionLabel will just be the original divisionName
  // This happens every time the divisions list changes
  useEffect(() => {
    handleOnLoad();
  }, [open,
    allEditedDivisions,
    allDeletedDivisions,
    currentlyEditing,
    deleted,
    allDivisions,
  ]);

  // Whenever the input field is changed, update the redux state
  useEffect(() => {
    updateEdits();
  }, [fieldState]);

  if (!useSelector(getEditing) || deleted || !topLabel || divisionId.toString() === '-1') {
    return (
      <div className="division-menu-item-container">
        <button
          type="button"
          key={divisionId}
          value={divisionId}
          className={`${topLabel ? 'division-menu--top' : 'division-menu--list-item '}`}
          onClick={() => handleDivisionClick(divisionId)}
        >
          {divisionLabel}
        </button>
        {useSelector(getEditing) && divisionId.toString() !== '-1' ? (
          <button type="button" className="delete-undelete-division-button" onClick={handleDeleteUndoButtonClicked}>
            <img src={deleted ? undoIcon : deleteIcon} alt="" className="delete-undelete-division-image" />
          </button>
        ) : null}
      </div>
    );
  }
  return (
    <div className="division-menu-item-container">
      <input
        type="text"
        value={fieldState.name}
        className="division-menu--top division-menu--editable"
        onChange={handleDivisionInputChanged}
      />
      {useSelector(getEditing) && divisionId.toString() !== '-1' ? (
        <button type="button" className="delete-undelete-division-button" onClick={handleDeleteUndoButtonClicked}>
          <img src={deleted ? undoIcon : deleteIcon} alt="" className="delete-undelete-division-image" />
        </button>
      ) : null}
    </div>
  );
};

// Connecting component props to redux state
const mapStateToProps = (state, ownProps) => ({
  allDivisions: getDivisions(state),
  currentlyEditing: getEditing(state),
  allDeletedDivisions: getDeletedDivisionIDs(state),
  allEditedDivisions: getEditedDivisionIDs(state),
  modified: ownProps.modified,
});

DivisionMenuItem.propTypes = {
  divisionId: PropTypes.number.isRequired,
  divisionName: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  topLabel: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(DivisionMenuItem);
