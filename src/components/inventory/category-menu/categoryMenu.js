import { React, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import CategoryMenuItem from './categoryMenuItem';
import { getCategories, getEditing } from '../redux/selectors';
import './categoryMenu.css';

const axios = require('axios');

// TO DO: show only 4 categories at a time

const CategoryMenu = (prop) => {
  // Arrows for menu navigation
  const Arrow = (text, className) => <div className={className}>{text}</div>;
  const ArrowLeft = Arrow('< ', 'arrow-prev');
  const ArrowRight = Arrow(' >', 'arrow-next');
  const [categories, setCategories] = useState([]);
  const [currentCategories, setCurrentCategories] = useState([0, 1, 2, 3]);

  useEffect(() => {
    // Fetches item categories
    const fetchItemCategories = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/category`,
        {
          params: {},
          withCredentials: true,
        },
      );
      setCategories(response.data);
      if (response.data.length >= 4) {
        setCurrentCategories([0, 1, 2, 3]);
      } else {
        setCurrentCategories([0, 1, 2, 3].slice(0, response.data.length));
      }
    };
    fetchItemCategories();
    console.log('Categories!');
    console.log(categories);
    console.log('Indexes!');
    console.log(currentCategories);
  }, []);

  // We map our database's categories into a list of buttons
  return (
    <div id="scroll-menu-container">
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
        alignCenter={false}
        scrollBy={4}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  categoryList: getCategories(state),
  editing: getEditing(state),
});

export default connect(mapStateToProps, null)(CategoryMenu);
