import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector, useDispatch } from 'react-redux';

import { deleteItem, editItem, undeleteItem } from '../redux/actions';
import { getEditing, getCategories } from '../redux/selectors';

import MobileStaticItem from './MobileStaticItem';
import MobileFormItem from './MobileFormItem';

import './mobileItem.css';

const getCategoryLabelFromID = (id) => {
  const category = useSelector(getCategories).find((cat) => cat.id === id);
  return category ? category.label : '';
};

const MobileItem = ({
  item, editing,
}) => {
  const dispatch = useDispatch();
  // State variable for all editable fields
  const originalCategory = item.category_id;
  const [fieldState, setFieldState] = useState({
    name: item.name,
    quantity: item.quantity,
    needed: item.needed,
    category: originalCategory,
  });

  // Used to update css class of unsaved edits
  const [isModified, setIsModified] = useState(false);

  // Used to update css class of unsaved delete
  const [deleted, setDeleted] = useState(false);
  console.log(deleted);

  // Appends to edits object at every change
  // This could probably be changed to only update once
  const updateEdits = () => {
    dispatch(editItem(item.id, fieldState));
    setIsModified(false);
  };

  // Adds item id to list of items to be deleted
  const deleteHandler = () => {
    if (!deleted) {
      dispatch(deleteItem(item.id));
      setDeleted(true);
    } else {
      dispatch(undeleteItem(item.id));
      setDeleted(false);
    }
  };

  // Updates text fields when editing
  const handleChange = (e) => {
    setIsModified(true);
    const { name, value } = e.target;

    setFieldState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Sets field state on component mount
  useEffect(() => {
    setFieldState(fieldState);
  }, []);

  // Updating values when editing
  useEffect(() => {
    setFieldState(fieldState);
    // Only update edits if user has modified values
    // and table is in edit mode
    if (isModified && editing) {
      updateEdits();
    }
  }, [fieldState]);

  // Reset field values once edit canceled
  useEffect(() => {
    setFieldState({
      name: item.name,
      quantity: item.quantity,
      needed: item.needed,
      category: item.category_id,
    });
    setDeleted(false);
  }, [item, useSelector(getEditing)]);

  return editing
    ? (
      <MobileFormItem
        item={item}
        fieldState={fieldState}
        deleted={deleted}
        getCategoryLabelFromID={getCategoryLabelFromID}
        handleChange={handleChange}
        deleteHandler={deleteHandler}
      />
    )
    : (
      <MobileStaticItem
        fieldState={fieldState}
        getCategoryLabelFromID={getCategoryLabelFromID}
      />
    );
};

MobileItem.propTypes = {
  item: PropTypes.objectOf({
    category_id: PropTypes.number,
    name: PropTypes.string,
    quantity: PropTypes.number,
    needed: PropTypes.number,
    id: PropTypes.string,
  }).isRequired,
  editing: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  editing: getEditing(state),
  key: ownProps.key,
  item: ownProps.item,
});

export default connect(mapStateToProps, null)(MobileItem);
