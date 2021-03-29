import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import './TitledCard.css';

const TitledCard = ({ title, children }) => (
  <div className="titled-card-container">
    <h4 className="titled-card-title">{title}</h4>
    <Card>
      {children}
    </Card>

  </div>
);

TitledCard.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default TitledCard;
