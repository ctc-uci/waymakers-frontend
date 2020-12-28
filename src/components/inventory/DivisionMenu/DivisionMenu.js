import React, { useEffect, useState } from 'react';
import './DivisionMenu.css';

const DivisionMenu = (prop) => {
  // Gets division list from inventory.js
  const [divisionList, setdivisionList] = useState(prop.divisionList);

  // Returns a button for a single Division
  const MenuItem = (divisionLabel) => (
    <label htmlFor={divisionLabel}>
      <input
        id={divisionLabel}
        type="radio"
        name="division"
        value={divisionLabel}
        onChange={() => {
          const selectedCategory = (divisionLabel === 'Show All Divisions') ? '' : divisionLabel;
          prop.setSelectedDivision(selectedCategory);
        }}
      />
      {divisionLabel}
    </label>
  );

  // Creating list of buttons for Division menu
  const Menu = (list) => list.map((el) => {
    const { divisionLabel } = el;
    console.log({ divisionLabel }, { el });
    return MenuItem(divisionLabel);
  });

  const [menu, setMenu] = useState(Menu(divisionList, 0));

  // Updates state when Division list in inventory.js updates
  useEffect(() => {
    setdivisionList(prop.divisionList);
  }, [prop.divisionList]);

  // Updates list of Division buttons once Division list is updated
  useEffect(() => {
    setMenu(Menu(divisionList, 0));
  }, [divisionList]);

  return (
    <form>
      <ul>
        {menu}
      </ul>
    </form>
  );
};

export default DivisionMenu;
