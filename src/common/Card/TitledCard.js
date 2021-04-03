import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

import './TitledCard.css';

const TitledCard = ({
  title, children, className, cardClassName,
}) => (
  <div className={`titled-card-container ${className}`}>
    <h4 className="titled-card-title">{title}</h4>
    <Card className={cardClassName}>
      {children}
    </Card>
  </div>
);

TitledCard.defaultProps = {
  className: '',
  cardClassName: '',
};

TitledCard.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  cardClassName: PropTypes.string,
};

export default TitledCard;
