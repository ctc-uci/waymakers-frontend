import React, { useEffect, useState } from 'react';
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
  const [categoryList, setCategoryList] = useState([]);

  /** ******************** ALL SCROLL MENU ITEMS ( CATEGORICAL DISPLAY ) HERE******************* */
  const MenuItem = (label) => {
    const onClickMenuItem = () => {
      if (label === 'Show All Categories') {
        setSelectedCategory('');
      } else {
        setSelectedCategory(label);
      }
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

  /** ******************** SEARCH ITEMS HERE****************** */
  const [searchSubstring, setSearchSubstring] = useState('');

  const SearchItem = () => {
    console.log('searching');
    return (
      <>
        <input
          type="text"
          className="form-control"
          placeholder="Search for an item..."
          value={searchSubstring}
          onChange={(e) => setSearchSubstring(e.target.value)}
        />
      </>
    );
  };

  /** ******************** END SEARCH ITEMS HERE******************* */

  /** ******************** CATEGORY TITLE HERE****************** */
  const CurrentCategoryLabel = () => {
    const currentCategory = selectedCategory === '' ? ' All Categories' : ` ${selectedCategory}`;
    return (
      <h1>
        Showing Category:
        {currentCategory}
      </h1>
    );
  };

  /** ******************** DISPLAY ITEMS HERE************************* */
  const getItems = async () => {
    console.log('Getting items');
    try {
      // NOT SEARCHING
      if (searchSubstring === '') {
        const response = await fetch(
          `http://localhost:3000/inventory/${selectedCategory}`,
        );
        const jsonData = await response.json();
        setItems(jsonData);
      // SEARCH for item with ONLY SUBSTRING
      } else if (selectedCategory === '') {
        const response = await fetch(
          `http://localhost:3000/inventory/search/${searchSubstring}/`,
        );
        const jsonData = await response.json();
        setItems(jsonData);
      // SEARCH for item with SUBSTRING and CATEGORY
      } else {
        const response = await fetch(
          `http://localhost:3000/inventory/search/${searchSubstring}/${selectedCategory}`,
        );
        const jsonData = await response.json();
        setItems(jsonData);
      }
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
      setCategoryList([{ label: 'Show All Categories' }].concat(jsonData));
      console.log(categoryList);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Sets categoriesList once component mounts, is not called again
  useEffect(() => {
    getCategories();
  }, []);
  // Sets menu as soon as categoryList is loaded, or changes
  useEffect(() => {
    setMenu(Menu(categoryList, 0));
  }, [categoryList]);

  // Updates items list when selectedCategory changes or searchSubstring changes
  useEffect(() => {
    getItems();
  }, [selectedCategory, searchSubstring]);

  return (
    <>
      <AddItem />
      <ScrollMenu
        data={menu}
        arrowLeft={ArrowLeft}
        arrowRight={ArrowRight}
        selected={0}
      />
      <SearchItem />
      <CurrentCategoryLabel />
      <Table items={items} getItems={getItems} />
    </>
  );
};

export default DisplayItem;
