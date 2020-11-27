import React, { Fragment, useEffect, useState } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import AddItem from './AddItem';
import Table from './Table';

const DisplayItem = () => {
  /** STATE VARIABLES */
  // Current list of items to display
  const [items, setItems] = useState([]);
  // Current selected category of items to display
  const [selectedCategory, setSelectedCategory] = useState('');
  // Current list of categories (in scroll menu)
  const [categoryList, setCategoryList] = useState([
    { label: 'Show All Categories' },
  ]);

  /** ******************** ALL SCROLL MENU ITEMS HERE******************* */
  const MenuItem = (label) => {
    const onClickMenuItem = () => {
      setSelectedCategory(label);
      console.log(label);
    };
    return (
      <button type="button" className="btn btn-warning" onClick={onClickMenuItem}>
        {label}
      </button>
    );
  };

  const Menu = (list) => list.map((el) => {
    const { label } = el;
    return MenuItem(label);
  });

  const Arrow = (text, className) => <div className={className}>{text}</div>;
  const ArrowLeft = Arrow('<', 'arrow-prev');
  const ArrowRight = Arrow('>', 'arrow-next');

  /** ******************** END SCROLL MENU ITEMS HERE******************* */

  /** ******************** DISPLAY ITEMS HERE************************* */
  const getItems = async () => {
    console.log('Getting items');
    try {
      if (selectedCategory === 'Show All Categories') setSelectedCategory('');
      const response = await fetch(
        `http://localhost:3000/inventory/${selectedCategory}`,
      );
      const jsonData = await response.json();
      setItems(jsonData);
      console.log(items);
    } catch (err) {
      console.error(err.message);
    }
  };

  const [menu, setMenu] = useState(Menu(categoryList, 0));

  const getCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/category/');
      const jsonData = await response.json();
      setCategoryList(jsonData);
      setMenu(Menu(categoryList, 0));
      console.log(categoryList);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getItems();
    getCategories();
  }, [selectedCategory]);

  return (
    <>
      <AddItem />
      <div className="App">
        <ScrollMenu
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={0}
        />
      </div>
      <Table items={items} getItems={getItems} />
    </>
  );
};

export default DisplayItem;
