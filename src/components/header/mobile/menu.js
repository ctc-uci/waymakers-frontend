import React from 'react';
import { StyledMenu } from './menu.styled';

const Menu = () => {
  return (
    <StyledMenu>
        <a id="profile" className="menu-item" href="/">Profile</a>
        <a id="events" className="menu-item" href="/events">Events</a>
        <a id="myhours" className="menu-item" href="/myhours">My Hours</a>
        <a id="submithours" className="menu-item" href="/submithours">Submit Hours</a>
        <a id="logout" className="menu-item" href="/logout">Logout</a>
    </StyledMenu>
  )
}
export default Menu;