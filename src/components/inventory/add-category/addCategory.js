import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ValidatedField } from '../../../common/formikExtensions';

import { addCategory } from '../redux/actions';
import { getCategories } from '../redux/selectors';

import { createAlert } from '../../../common/AlertBanner/AlertBannerSlice';
import { LightModal } from '../../../common/LightModal';
import './addCategory.css';

const AddCategorySchema = Yup.object().shape({
  label: Yup.string().required('Required'),
});

const AddCategoryButton = () => {
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(false);
  // const [label, setLabel] = useState('');

  const onSubmitAddCategory = (values) => {
    const { label } = values;
    // create an add category action
    dispatch(addCategory({
      label,
    })).then(() => {
      // dispatch(fetchCategories());
      setPopup(false);
      dispatch(createAlert({
        message: `Successfully created category '${label}'`,
        severity: 'success',
      }));
    });
  };

  const formik = useFormik({
    initialValues: {
      label: '',
    },
    validationSchema: AddCategorySchema,
    onSubmit: onSubmitAddCategory,
    // validate only on submit, change as needed
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <div className="add-category">
      <button type="button" className="add-category-button" onClick={() => setPopup(true)}>+</button>
      {/* Popup form for when button is clicked */}
      <LightModal
        className="add-category-popup"
        isOpen={popup}
        onRequestClose={() => setPopup(false)}
      >
        <form className="add-category-form" onSubmit={formik.handleSubmit}>
          {/* <p className="add-category-title">Create new category?</p> */}
          <ValidatedField name="label" labelText="Create new category?" isRequired formik={formik}>
            <input
              id="label"
              name="label"
              type="text"
              className="add-category-input"
              placeholder="Category Name"
              value={formik.values.label}
              onChange={formik.handleChange}
            />
          </ValidatedField>
          <div className="confirmation">
            <button type="button" className="category-form-button" onClick={() => setPopup(false)}>Cancel</button>
            <button type="submit" className="category-form-button submit-category">Yes</button>
          </div>
        </form>
      </LightModal>
    </div>
  );
};

// Connecting component props to redux state
const mapStateToProps = (state) => ({
  categories: getCategories(state),
});

export default connect(mapStateToProps, null)(AddCategoryButton);
