import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './DivisionMenu.css';

import { getDivisions, getSelectedDivisionLabel } from '../redux/selectors';
import { changeSelectedDivision } from '../redux/actions';
import store from '../redux/store';

const DivisionMenu = (prop) => {
  // Returns a button for a single Division
  const MenuItem = (divisionID, divisionLabel) => (
    <label htmlFor={divisionLabel}>
      <input
        id={divisionID}
        type="radio"
        name="division"
        value={divisionID}
        onChange={() => { store.dispatch(changeSelectedDivision(divisionID, divisionLabel)); }}
      />
      {divisionLabel}
    </label>
  );

  // Creating list of buttons for Division menu
  const Menu = (list) => list.map((div) => MenuItem(div.id, div.div_name));

  const [menu, setMenu] = useState(Menu(prop.divisionList, 0));

  // Updates list of Division buttons once Division list is updated
  useEffect(() => {
    setMenu(Menu(prop.divisionList, 0));
  }, [prop.divisionList]);

  return (
    <form>
      <ul>
        {menu}
      </ul>
    </form>
  );
};

// Connecting component props to redux state
const mapStateToProps = (state) => ({
  divisionList: getDivisions(state),
  selectedDivision: getSelectedDivisionLabel(state),
});

export default connect(mapStateToProps, null)(DivisionMenu);
