/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { createAlert } from '../../../../common/AlertBanner/AlertBannerSlice';

import {
  changeSelectedWarehouse,
  deleteWarehouse,
  undeleteWarehouse,
  editWarehouse,
} from '../../redux/actions';

import {
  getEditing,
  getDeletedWarehouseIDs,
  getEditedWarehouseIDs,
  getWarehouses,
} from '../../redux/selectors';

import deleteIcon from '../../../../assets/deleteIcon.svg';
import undoIcon from '../../../../assets/undeleteIcon.svg';

import './warehouseMenuItem.css';

const WarehouseMenuItem = ({
  allWarehouses,
  currentlyEditing,
  allEditedWarehouses,
  allDeletedWarehouses,
  warehouseId,
  warehouseName,
  open,
  setOpen,
  topLabel,
}) => {
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(false);
  const [modified, setModified] = useState(false);
  const [warehouseLabel, setWarehouseLabel] = useState(warehouseName);
  const [fieldState, setFieldState] = useState({
    id: warehouseId,
    name: warehouseName,
  });

  const handleWarehouseClick = (wareId) => {
    if (topLabel) {
      setOpen(!open);
    } else {
      dispatch(changeSelectedWarehouse(parseInt(wareId, 10)));
      setOpen(false);
    }
  };

  // Called whenever the division name is modified
  const handleWarehouseInputChanged = (e) => {
    const targetLabel = e.target.value;
    if (targetLabel.length > 0) {
      setFieldState({
        ...fieldState,
        name: e.target.value,
      });
      setModified(true);
    } else {
      dispatch(createAlert({
        message: 'Warehouse name can not be empty!',
        severity: 'error',
      }));
    }
  };

  const handleDeleteUndoButtonClicked = () => {
    if (deleted) {
      dispatch(undeleteWarehouse(warehouseId.toString()));
      setDeleted(false);
    } else {
      dispatch(deleteWarehouse(warehouseId.toString()));
      setDeleted(true);
    }
  };

  // This function sets the warehouseLabel that will be displayed
  const handleOnLoad = () => {
    let warehouseDeleted = false;
    if (allDeletedWarehouses) {
      warehouseDeleted = allDeletedWarehouses
        .filter((wareId) => wareId.toString() === warehouseId.toString()).length > 0;
      setDeleted(warehouseDeleted);
      if (warehouseDeleted) {
        setWarehouseLabel(<strike>{fieldState.name}</strike>);
      }
    }
    if (!warehouseDeleted && allEditedWarehouses) {
      if (warehouseId in allEditedWarehouses) {
        setFieldState({
          ...fieldState,
          name: allEditedWarehouses[warehouseId].name,
        });
        setWarehouseLabel(allEditedWarehouses[warehouseId].name);
      } else {
        setWarehouseLabel(warehouseName);
      }
    }
  };

  // Updates redux state with the new edited warehouse
  // Called whenever the fieldState is modified (through useEffect below)
  const updateEdits = () => {
    if (currentlyEditing && modified) {
      dispatch(editWarehouse(warehouseId, fieldState));
      setModified(false);
    }
  };

  // Every time a different warehouse is clicked from thedropdown menu, update the fieldState
  useEffect(() => {
    setFieldState({
      id: warehouseId,
      name: warehouseName,
    });
  }, [warehouseId, currentlyEditing]);

  // Check if the current warehouse has been deleted
  //  If so, set warehouseLabel to be the crossed out version of the edited warehouseName
  //  OR the crossed out original warehouseName if the warehouse hasn't been edited
  //
  //  If not, check if the warehouse has been edited
  //    If so, set warehouseLabel to the edited field
  //    If not, warehouseLabel will just be the original warehouseName
  // This happens every time the warehouse list changes
  useEffect(() => {
    handleOnLoad();
  }, [open,
    allEditedWarehouses,
    allDeletedWarehouses,
    currentlyEditing,
    deleted,
    allWarehouses,
  ]);

  // Whenever the input field is changed, update the redux state
  useEffect(() => {
    updateEdits();
  }, [fieldState]);

  if (!useSelector(getEditing) || deleted || !topLabel || warehouseId.toString() === '-1') {
    return (
      <div className="warehouse-menu-item-container">
        <button
          className={topLabel ? 'warehouse-menu--top' : 'warehouse-menu--list-item '}
          type="button"
          key={warehouseId}
          value={warehouseId}
          onClick={() => handleWarehouseClick(warehouseId, warehouseName)}
        >
          {warehouseLabel}
        </button>
        {useSelector(getEditing) && warehouseId.toString() !== '-1' ? (
          <button className="delete-undelete-warehouse-button" type="button" onClick={handleDeleteUndoButtonClicked}>
            <img src={deleted ? undoIcon : deleteIcon} alt="" className="delete-undelete-division-image" />
          </button>
        ) : null}
      </div>
    );
  }
  return (
    <div className="warehouse-menu-item-container">
      <input
        type="text"
        value={fieldState.name}
        className="warehouse-menu--top warehouse-menu--editable"
        onChange={handleWarehouseInputChanged}
      />
      {useSelector(getEditing) && warehouseId.toString() !== '-1' ? (
        <button type="button" className="delete-undelete-division-button" onClick={handleDeleteUndoButtonClicked}>
          <img src={deleted ? undoIcon : deleteIcon} alt="" className="delete-undelete-division-image" />
        </button>
      ) : null}
    </div>
  );
};

// Connecting component props to redux state
const mapStateToProps = (state, ownProps) => ({
  allWarehouses: getWarehouses(state),
  currentlyEditing: getEditing(state),
  allDeletedWarehouses: getDeletedWarehouseIDs(state),
  allEditedWarehouses: getEditedWarehouseIDs(state),
  modified: ownProps.modified,
});

WarehouseMenuItem.propTypes = {
  warehouseId: PropTypes.number.isRequired,
  warehouseName: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  topLabel: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(WarehouseMenuItem);
