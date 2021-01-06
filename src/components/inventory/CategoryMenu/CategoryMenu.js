import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import MenuItem from './CategoryMenuItem';
// const axios = require('axios');

// TODO: Implement category deletion

const CategoryMenu = (prop) => {
  // Gets category list from inventory.js
  // const [categoryList, setCategoryList] = useState(props.categoryList);
  // List of categories to be deleted (ids)
  // const deleteCategories = [];

  /**
  // Sends edits once saved
  const saveDeletes = async () => {
    // deleteCategories.forEach(async (id) => {
    //   deleteCategory(id);
    // });
    // const deletePromises = [];
    // // Populating list of DELETE requests
    // deleteCategories.forEach(async (id) => {
    //   deletePromises.push(
    //     axios.delete(`http://localhost:3000/category/${id}`),
    //   );
    // });
    // // Perform all DELETE requests concurrently
    // Promise.all(deletePromises).catch((error) => { console.error(error); });
    // fetchCategories();
  };
  useEffect(() => {
    if (prop.editing === 'saved') {
      saveDeletes();
    }
  }, [prop.editing]);
  */
  // Left and right arrows for category traversal
  const Arrow = (text, className) => <div className={className}>{text}</div>;
  const ArrowLeft = Arrow('<', 'arrow-prev');
  const ArrowRight = Arrow('>', 'arrow-next');

  /**
  // Updates state when category list in inventory.js updates
  useEffect(() => {
    setCategoryList(props.categoryList);
  }, [props.categoryList]);

  // Creating list of buttons for category menu
  const Menu = (list) => list.map((el) => {
    const { id, label } = el;
    return MenuItem(id, label);
  });

  // Creates a menu for the current state
  const [menu, setMenu] = useState(Menu(categoryList, 0));

  // Updates list of category buttons once category list is updated,
  // or edit state is changed
  useEffect(() => {
    setMenu(Menu(categoryList, 0));
  }, [categoryList, props.editing]);
  */
  return (
    <ScrollMenu
      data={prop.categoryList.map((category) => (
        <MenuItem
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
