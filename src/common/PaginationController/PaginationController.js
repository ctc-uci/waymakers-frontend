import React from 'react';
import PropTypes from 'prop-types';

import back from '../../assets/pageBack.svg';
import forward from '../../assets/pageForward.svg';

import './PaginationController.css';

const PaginationController = ({ paginatedIndex, setPaginatedIndex, totalNumberOfPages }) => (
  <div className="pagination-indicator">
    <button type="button" onClick={() => { setPaginatedIndex((old) => Math.max(0, old - 1)); }}>
      <img src={back} alt="back page" />
    </button>
    <div>{totalNumberOfPages === 0 ? 0 : paginatedIndex + 1}</div>
    <div>/</div>
    <div>{totalNumberOfPages}</div>
    <button type="button" onClick={() => { setPaginatedIndex((old) => Math.min(totalNumberOfPages - 1, old + 1)); }}>
      <img src={forward} alt="next page" />
    </button>
  </div>
);

PaginationController.propTypes = {
  totalNumberOfPages: PropTypes.number.isRequired,
  paginatedIndex: PropTypes.number.isRequired,
  setPaginatedIndex: PropTypes.func.isRequired,
};

export default PaginationController;
