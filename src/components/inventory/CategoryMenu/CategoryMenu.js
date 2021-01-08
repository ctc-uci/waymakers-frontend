import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import CategoryMenuItem from './CategoryMenuItem';

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

export default CategoryMenu;
