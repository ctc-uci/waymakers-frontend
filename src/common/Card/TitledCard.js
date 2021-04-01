import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import './TitledCard.css';

const TitledCard = ({ title, children, className }) => (
  <div className="titled-card-container">
    <h4 className="titled-card-title">{title}</h4>
    <Card className={className}>
      {children}
    </Card>

  </div>
);

TitledCard.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

TitledCard.defaultProps = {
  className: '',
};

export default TitledCard;
