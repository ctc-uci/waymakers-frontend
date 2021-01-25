import React from 'react';
import { connect } from 'react-redux';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import CategoryMenuItem from './categoryMenuItem';
import { getCategories, getEditing } from '../redux/selectors';

const CategoryMenu = (prop) => {
  // Arrows for menu navigation
  const Arrow = (text, className) => <div className={className}>{text}</div>;
  const ArrowLeft = Arrow('<', 'arrow-prev');
  const ArrowRight = Arrow('>', 'arrow-next');
  // We map our database's categories into a list of buttons
  return (
    <ScrollMenu
      data={prop.categoryList.map((category) => (
        <CategoryMenuItem
          key={category.id}
          category={category}
          editing={prop.editing}
        />
      ))}
      arrowLeft={ArrowLeft}
      arrowRight={ArrowRight}
      selected={0}
    />
  );
};

const mapStateToProps = (state) => ({
  categoryList: getCategories(state),
  editing: getEditing(state),
});

export default connect(mapStateToProps, null)(CategoryMenu);
