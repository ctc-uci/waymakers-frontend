import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ children, className }) => (
  <div className={`card ${className}`}>
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.defaultProps = {
  className: '',
};

export default Card;
