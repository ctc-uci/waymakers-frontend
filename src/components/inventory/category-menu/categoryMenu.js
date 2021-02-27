import { React } from 'react';
import { connect, useSelector } from 'react-redux';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import CategoryMenuItem from './categoryMenuItem';
import { getCategories, getEditing } from '../redux/selectors';
import './categoryMenu.css';

// TO DO: show only 4 categories at a time

const CategoryMenu = (prop) => {
  // Arrows for menu navigation
  const Arrow = (className) => <button type="button" aria-label="arrow" className={className} />;
  const ArrowLeft = Arrow('arrow-prev');
  const ArrowRight = Arrow('arrow-next');

  // We map our database's categories into a list of buttons
  return (
    // Using a different className in edit mode to solve layout issues between edit & non-edit mode
    <div id="scroll-menu-container" className={!useSelector(getEditing) ? 'scroll-menu-container--no-edit' : null}>
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
        dragging={false}
        wheel={false}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  categoryList: getCategories(state),
  editing: getEditing(state),
});

export default connect(mapStateToProps, null)(CategoryMenu);
