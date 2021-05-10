import React from 'react';
import PropTypes from 'prop-types';

import './MobileStaticItem.css';

const MobileStaticItem = ({ fieldState, getCategoryLabelFromID }) => (
  <div className="static-mobile-table-row">
    <div className="static-mobile-table-col col-1">
      <div className="static-mobile-item-name">
        <p>{fieldState.name}</p>
      </div>
      <div className="static-mobile-item-attribute">
        <p>{getCategoryLabelFromID(fieldState.category)}</p>
      </div>
    </div>
    <div className="static-mobile-table-col col-2">
      <div className="static-mobile-item-attribute">
        <p>In Stock: </p>
        <p>Needed: </p>
      </div>
      <div className="static-mobile-item-attribute">
        <p className="item-num">
          {fieldState.quantity}
        </p>
        <p className="item-num">
          {fieldState.needed}
        </p>
      </div>
    </div>
  </div>
);

MobileStaticItem.propTypes = {
  fieldState: PropTypes.objectOf({
    name: PropTypes.string,
  }).isRequired,
  getCategoryLabelFromID: PropTypes.func.isRequired,
};

export default MobileStaticItem;
