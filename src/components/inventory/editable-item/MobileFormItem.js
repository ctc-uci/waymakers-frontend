import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { getCategories } from '../redux/selectors';

import MobileInput from './MobileInput';
import MobileDel from './MobileDel';

import deleteIcon from '../../../assets/deleteIcon.svg';
import undeleteIcon from '../../../assets/undeleteIcon.svg';

import './MobileFormItem.css';

const getCategoryLabelFromID = (id) => {
  const category = useSelector(getCategories).find((cat) => cat.id === id);
  return category ? category.label : '';
};

const MobileFormItem = ({
  item, fieldState, deleted, handleChange, deleteHandler,
}) => (
  <div className="form-mobile-table-row">
    <div className="form-mobile-table-col col-1">
      <div className="form-mobile-item-name form-mobile-item-attribute">
        <MobileInput
          name="name"
          type="text"
          className="table-input-name"
          value={fieldState.name}
          form={item.id}
          onChange={handleChange}
          deleted={deleted}
        />
      </div>
      <div className="form-mobile-item-attribute">
        {deleted
          ? <MobileDel className="deleted-item">{getCategoryLabelFromID(item.category_id)}</MobileDel>
          : (
            <select
              className="mobile-category-dropdown table-input-name"
              name="category"
              value={fieldState.category}
              form={item.id}
              onChange={handleChange}
            >
              <option value="">No category</option>
              {/* Creating dropdown menu items from categories list */}
              {/* category.label is displayed, but the value of the option will be the ID */}
              {useSelector(getCategories)
                .filter((category) => category.id > 0)
                .map((category) => (
                  <option key={item.id} value={category.id}>{category.label}</option>
                ))}
            </select>
          )}
      </div>
    </div>
    <div className="form-mobile-table-col col-2">
      <div className="form-mobile-item-attribute">
        <p>In Stock: </p>
        <p>Needed: </p>
      </div>
      <div className="form-mobile-item-attribute quantities">
        <MobileInput
          name="quantity"
          type="number"
          className="item-num-input"
          value={fieldState.quantity}
          form={item.id}
          onChange={handleChange}
          deleted={deleted}
        />
        <MobileInput
          name="needed"
          type="number"
          className="item-num-input"
          value={fieldState.needed}
          form={item.id}
          onChange={handleChange}
          deleted={deleted}
        />
      </div>
    </div>
    <div className="form-mobile-table-col col-3">
      <button
        type="button"
        className="delete-button"
        aria-label="delete"
        onClick={deleteHandler}
      >
        <img src={deleted ? undeleteIcon : deleteIcon} className="delete-icon" alt="" />
      </button>
    </div>
  </div>
);

MobileFormItem.propTypes = {
  item: PropTypes.objectOf({
    category_id: PropTypes.number,
    name: PropTypes.string,
    quantity: PropTypes.number,
    needed: PropTypes.number,
    id: PropTypes.string,
  }).isRequired,
  fieldState: PropTypes.objectOf({
    name: PropTypes.string,
  }).isRequired,
  deleted: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default MobileFormItem;
