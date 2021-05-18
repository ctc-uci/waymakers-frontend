import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ValidatedField } from '../../../../common/formikExtensions';

import { addWarehouse, fetchWarehouses } from '../../redux/actions';
import { getWarehouses, getSelectedDivisionID } from '../../redux/selectors';
import { LightModal } from '../../../../common/LightModal';

import { createAlert } from '../../../../common/AlertBanner/AlertBannerSlice';

import './addWarehouse.css';

const AddWarehouseSchema = Yup.object().shape({
  warehouse: Yup.string().required('Required'),
  division: Yup.string().required('Required'),
});

const AddWarehouseButton = (prop) => {
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(false);
  // const [warehouse, setWarehouse] = useState('');
  const [selectedDivision, setSelectedDivision] = useState(prop.selectedDivision);

  // Updates button when selectedDivision changes
  useEffect(() => {
    setSelectedDivision(selectedDivision);
  }, [selectedDivision]);

  const onSubmitAddWarehouse = (values, actions) => {
    const { warehouse: warehouseLabel } = values;
    const { division } = values;
    // create an add warehouse action
    dispatch(addWarehouse({
      warehouseLabel,
      // get currently selected division and put it here v
      // TO DO: set the division to whatever division is currently selected
      division,
    })).then(() => {
      setPopup(false);
      dispatch(fetchWarehouses(prop.currentDivisionID));
      dispatch(createAlert({
        message: `Successfully created warehouse '${warehouseLabel}'!`,
        severity: 'success',
      }));
      actions.resetForm({
        warehouse: '',
        division: '',
      });
    });
  };

  const formik = useFormik({
    initialValues: {
      warehouse: '',
      division: '',
    },
    validationSchema: AddWarehouseSchema,
    onSubmit: onSubmitAddWarehouse,
    // validate only on submit, change as needed
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <div className="add-warehouse">
      <button type="button" className="add-warehouse-button" onClick={() => setPopup(true)}>+</button>
      {/* Popup form for when button is clicked */}
      <LightModal
        className="add-warehouse-popup"
        isOpen={popup}
        onRequestClose={() => setPopup(false)}
      >
        <form className="add-warehouse-form" onSubmit={formik.handleSubmit}>
          {/* <p className="add-warehouse-title">Add new warehouse?</p> */}
          <ValidatedField name="warehouse" labelText="Add new warehouse?" isRequired formik={formik}>
            <input
              id="warehouse"
              name="warehouse"
              type="text"
              className="add-warehouse-input"
              placeholder="Warehouse Name"
              value={formik.values.warehouse}
              onChange={formik.handleChange}
            />
          </ValidatedField>

          <ValidatedField name="division" labelText="To which division?" isRequired formik={formik}>
            <select
              id="division"
              name="division"
              value={formik.values.division}
              onChange={(e) => {
                setSelectedDivision(e.target.value);
                formik.handleChange(e);
              }}
            >
              <option value="" selected disabled>Select division...</option>
              {/* Creating dropdown menu items from divisions list */}
              {/* division.div_name is displayed, but the value of the option will be the ID */}
              {Object.entries(prop.divisionList)
                .filter((warehouse) => warehouse[0] !== '-1')
                .sort((a, b) => (a.id > b.id ? 1 : -1))
                .map(([id, division]) => (
                  id > -1 && <option key={id} value={id}>{division.div_name}</option>
                ))}
            </select>
          </ValidatedField>
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
  currentDivisionID: getSelectedDivisionID(state),
});

export default connect(mapStateToProps, null)(AddWarehouseButton);
