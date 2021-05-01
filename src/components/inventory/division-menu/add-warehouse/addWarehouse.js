import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { addWarehouse } from '../../redux/actions';
import { getWarehouses } from '../../redux/selectors';
import { LightModal } from '../../../../common/LightModal';
import './addWarehouse.css';

const AddWarehouseButton = (prop) => {
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(false);
  const [warehouse, setWarehouse] = useState('');
  const [selectedDivision, setSelectedDivision] = useState(prop.selectedDivision);

  // Updates button when selectedDivision changes
  useEffect(() => {
    setSelectedDivision(prop.selectedDivision);
  }, [prop.selectedDivision]);

  const handleOnSubmit = () => {
    // create an add warehouse action
    dispatch(addWarehouse({
      warehouseLabel: warehouse,
      // get currently selected division and put it here v
      // TO DO: set the division to whatever division is currently selected
      division: selectedDivision,
    }));
  };

  return (
    <div className="add-warehouse">
      <button type="button" className="add-warehouse-button" onClick={() => setPopup(true)}>+</button>
      {/* Popup form for when button is clicked */}
      <LightModal
        className="add-warehouse-popup"
        isOpen={popup}
        onRequestClose={() => setPopup(false)}
      >
        <form className="add-warehouse-form" onSubmit={handleOnSubmit}>
          <p className="add-warehouse-title">Add new warehouse?</p>
          <input
            type="text"
            className="add-warehouse-input"
            name="add-warehouse-input"
            placeholder="Warehouse Name"
            onChange={(e) => setWarehouse(e.target.value)}
          />
          <select
            name="category"
            value={selectedDivision}
            onChange={(e) => {
              setSelectedDivision(e.target.value);
            }}
          >
            {/* Creating dropdown menu items from divisions list */}
            {/* division.div_name is displayed, but the value of the option will be the ID */}
            {Object.entries(prop.divisionList)
              .sort((a, b) => (a.id > b.id ? 1 : -1))
              .map(([id, division]) => (
                id > -1 && <option key={id} value={id}>{division.div_name}</option>
              ))}
          </select>
          <div className="confirmation">
            <button type="button" className="warehouse-form-button" onClick={() => setPopup(false)}>Close</button>
            <button type="submit" className="warehouse-form-button submit-warehouse">Yes</button>
          </div>
        </form>
      </LightModal>
    </div>
  );
};

// Connecting component props to redux state
const mapStateToProps = (state) => ({
  categories: getWarehouses(state),
});

export default connect(mapStateToProps, null)(AddWarehouseButton);
