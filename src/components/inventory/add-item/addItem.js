import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ValidatedField } from '../../../common/formikExtensions';

import { WMKBackend } from '../../../common/utils';

import {
  LightModalHeader,
  LightModalBody,
  LightModalButton,
} from '../../../common/LightModal';
import { addItem, fetchItems } from '../redux/actions';
import { getCategories, getDivisions } from '../redux/selectors';

import { createAlert } from '../../../common/AlertBanner/AlertBannerSlice';

// note: this is only used in AddItemModal.js
const AddItemFormSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  quantity: Yup.string().required('Required').test(
    'Is positive?',
    'In stock value must be at least 0',
    (value) => value >= 0,
  ),
  needed: Yup.string().required('Required').test(
    'Is positive?',
    '# needed value must be at least 0',
    (value) => value >= 0,
  ),
  warehouse: Yup.string().required('Required'),
});

// Add item menu here
const AddItem = (prop) => {
  const dispatch = useDispatch();
  // Division selected in the add item modal
  // Used for determining which warehouses to show in the form-select for warehouses
  const [selectedDivision, setSelectedDivision] = useState('');
  // list of warehouses attached to the currently selected division
  const [warehouses, setWarehouses] = useState([]);

  const onSubmitAddItem = (values) => {
    // Create an add item action
    const {
      name,
      quantity,
      needed,
      warehouse,
      category,
    } = values;
    dispatch(addItem({
      name, quantity, needed, warehouse, category,
    })).then(() => {
      prop.setIsOpen(false);
      dispatch(fetchItems());
      dispatch(createAlert({
        message: `Successfully added item '${name}'!`,
        severity: 'success',
      }));
    });
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      quantity: '0',
      needed: '0',
      division: '',
      warehouse: '',
      category: '',
    },
    validationSchema: AddItemFormSchema,
    onSubmit: onSubmitAddItem,
    // validate only on submit, change as needed
    validateOnBlur: false,
    validateOnChange: false,
  });

  useEffect(() => {
    // Fetches warehouses connected to the selected division
    const fetchWarehouses = async () => {
      const response = await WMKBackend('/warehouses', { params: { division: selectedDivision } });
      setWarehouses(response.data);
    };
    fetchWarehouses();
    // formik.setFieldValue('warehouse', '');
  }, [selectedDivision]);

  return (
    <>
      <LightModalHeader title="Add a New Item" onClose={() => prop.setIsOpen(false)} />
      <LightModalBody>
        <form className="add-item-form" onSubmit={formik.handleSubmit}>
          <ValidatedField name="name" labelText="Name" isRequired formik={formik}>
            <input
              id="name"
              type="text"
              className="add-item-input"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </ValidatedField>

          <ValidatedField name="quantity" labelText="In Stock" isRequired formik={formik}>
            <input
              id="quantity"
              type="number"
              className="add-item-input"
              value={formik.values.quantity}
              onChange={formik.handleChange}
            />
          </ValidatedField>

          <ValidatedField name="needed" labelText="# Needed" isRequired formik={formik}>
            <input
              id="needed"
              type="number"
              className="add-item-input"
              value={formik.values.needed}
              onChange={formik.handleChange}
            />
          </ValidatedField>

          <ValidatedField name="division" labelText="Division" formik={formik}>
            <select
              id="division"
              name="division"
              className="add-item-form-select"
              value={formik.values.division}
              onChange={(e) => {
                formik.handleChange(e);
                setSelectedDivision(e.target.value);
              }}
            >
              <option value="" selected disabled>Select Division...</option>
              {/* Creating dropdown menu items from divisions list */}
              {/* division.div_name is displayed, but the value of the option will be the ID */}
              {Object.entries(prop.divisions)
                .sort((a, b) => (a.id > b.id ? 1 : -1))
                .map(([id, divi]) => (
                  <option value={id}>{divi.div_name}</option>
                ))}
            </select>
          </ValidatedField>

          <ValidatedField name="warehouse" labelText="Warehouse" isRequired formik={formik}>
            <select
              id="warehouse"
              name="warehouse"
              className="add-item-form-select"
              value={formik.values.warehouse}
              onChange={formik.handleChange}
            >
              <option value="" selected disabled>Select Warehouse...</option>
              {warehouses.map((wh) => (
                <option value={wh.id}>{wh.warehouse_name}</option>
              ))}
            </select>
          </ValidatedField>

          <ValidatedField name="category" labelText="Category" formik={formik}>
            <select
              id="category"
              name="category"
              className="add-item-form-select add-item-last-field"
              value={formik.values.category}
              onChange={formik.handleChange}
            >
              <option value="" selected>No category</option>
              {/* Creating dropdown menu items from categories list */}
              {/* category.label is displayed, but the value of the option will be the ID */}
              {prop.categories
                .filter((cat) => cat.id > 0)
                .map((cat) => (
                  <option value={cat.id}>{cat.label}</option>
                ))}
            </select>
          </ValidatedField>
          <LightModalButton
            primary
            type="submit"
            className="add-item-submit"
          >
            Submit
          </LightModalButton>
          <LightModalButton
            secondaryOutline
            type="button"
            onClick={() => prop.setIsOpen(false)}
            className="add-item-cancel"
          >
            Cancel
          </LightModalButton>
        </form>
      </LightModalBody>
    </>
  );
};

// Connecting component props to redux state
const mapStateToProps = (state) => ({
  categories: getCategories(state),
  divisions: getDivisions(state),
});

export default connect(mapStateToProps, null)(AddItem);
