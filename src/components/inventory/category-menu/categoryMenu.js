import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { getCategories, getEditing } from '../redux/selectors';

import useMobileWidth from '../../../common/useMobileWidth';
import CategoryMenuItem from './categoryMenuItem';

import prevArrow from '../../../assets/inventoryArrowPrev.png';
import nextArrow from '../../../assets/inventoryArrowNext.png';

import './categoryMenu.css';

// TO DO: show only 4 categories at a time

const CategoryMenu = (prop) => {
  const isMobile = useMobileWidth();
  const [test, setTest] = useState('rerender');

  useEffect(() => {
    setTest('rerender');
    console.log(test);
  }, [useSelector(getEditing)]);

  // Arrows for menu navigation
  const Arrow = (arrow) => (
    <button type="button" aria-label="arrow" className="menu-arrow">
      <img src={arrow === 'arrow-prev' ? prevArrow : nextArrow} alt="" />
    </button>
  );
  const ArrowLeft = Arrow('arrow-prev');
  const ArrowRight = Arrow('arrow-next');

  // We map our database's categories into a list of buttons
  return (
    // Using a different className in edit mode to solve layout issues between edit & non-edit mode
    <div className="scroll-menu-container" id={useSelector(getEditing) ? 'scroll-menu-container--edit' : null}>
      <ScrollMenu
        data={prop.categoryList.map((category) => (
          <CategoryMenuItem
            key={category.id}
            category={category}
            editing={prop.editing}
          />
        ))}
        arrowLeft={!isMobile && ArrowLeft}
        arrowRight={!isMobile && ArrowRight}
        alignCenter={false}
        dragging={isMobile}
        wheel={false}
        transition={false}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  categoryList: getCategories(state),
  editing: getEditing(state),
});

export default connect(mapStateToProps, null)(CategoryMenu);
