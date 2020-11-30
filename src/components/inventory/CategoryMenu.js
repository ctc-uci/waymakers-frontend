import React, { useEffect, useState } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';

const CategoryMenu = (prop) => {
  // Gets category list from inventory.js
  const [categoryList, setCategoryList] = useState(prop.categoryList);

  // Returns a button for a single category
  const MenuItem = (label) => {
    // Updates selectedCategory in inventory.js, using function passed in
    const onClickMenuItem = () => {
      const selectedCategory = (label === 'Show All Categories') ? '' : label;
      prop.setSelectedCategory(selectedCategory);
    };
    return (
      <button type="button" className="btn btn-warning" onClick={onClickMenuItem}>
        {label}
      </button>
    );
  };

  // Creating list of buttons for category menu
  const Menu = (list) => list.map((el) => {
    const { label } = el;
    return MenuItem(label);
  });

  // Left and right arrows for category traversal
  const Arrow = (text, className) => <div className={className}>{text}</div>;
  const ArrowLeft = Arrow('<', 'arrow-prev');
  const ArrowRight = Arrow('>', 'arrow-next');

  const [menu, setMenu] = useState(Menu(categoryList, 0));

  // Updates state when category list in inventory.js updates
  useEffect(() => {
    setCategoryList(prop.categoryList);
  }, [prop.categoryList]);

  // Updates list of category buttons once category list is updated
  useEffect(() => {
    setMenu(Menu(categoryList, 0));
  }, [categoryList]);

  return (
    <ScrollMenu
      data={menu}
      arrowLeft={ArrowLeft}
      arrowRight={ArrowRight}
      selected={0}
    />
  );
};

export default CategoryMenu;
