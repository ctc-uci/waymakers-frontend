import React, { useEffect, useState } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';

// const axios = require('axios');

// TODO: Implement category deletion

const CategoryMenu = (prop) => {
  // Gets category list from inventory.js
  const [categoryList, setCategoryList] = useState(prop.categoryList);

  // List of categories to be deleted (ids)
  // const deleteCategories = [];

  // Sends edits once saved
  const saveDeletes = async () => {
    // const deletePromises = [];
    // // Populating list of DELETE requests
    // deleteCategories.forEach(async (id) => {
    //   deletePromises.push(
    //     axios.delete(`http://localhost:3000/category/${id}`),
    //   );
    // });
    // // Perform all DELETE requests concurrently
    // Promise.all(deletePromises).catch((error) => { console.error(error); });

    // prop.getCategories();
  };

  useEffect(() => {
    if (prop.editState === 'saved') {
      saveDeletes();
    }
  }, [prop.editState]);

  // Returns a button for a single category
  const MenuItem = (label) => {
    // Updates selectedCategory in inventory.js, using function passed in
    const selectCategory = () => {
      const selectedCategory = (label === 'Show All Categories') ? '' : label;
      prop.setSelectedCategory(selectedCategory);
    };
    const deleteCategory = () => {
      const selectedCategory = (label === 'Show All Categories') ? '' : label;
      prop.setSelectedCategory(selectedCategory);
    };
    const selectCategoryButton = (onClickFunction) => (
      <button type="button" className="btn btn-warning" onClick={onClickFunction}>
        {label}
      </button>
    );
    const deleteCategoryButton = (onClickFunction) => (
      <button type="button" className="btn btn-danger" onClick={onClickFunction}>
        X|
        {label}
      </button>
    );

    return prop.editState === 'editing' ? deleteCategoryButton(deleteCategory) : selectCategoryButton(selectCategory);
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

  // Updates list of category buttons once category list is updated,
  // or edit state is changed
  useEffect(() => {
    setMenu(Menu(categoryList, 0));
  }, [categoryList, prop.editState]);

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
