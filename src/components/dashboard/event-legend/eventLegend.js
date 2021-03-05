import React from 'react';
import './eventLegend.css';
// import * as IconBs from 'react-icons/bs';

const EventLegend = () => (
  // <div id="legend">
  //   <h3 id="legend-title">Key</h3>
  //   <div className="legend-item">
  //     <IconBs.BsSquareFill size={20} color="var(--color-golden-yellow)" />
  //     <p className="event-type">Volunteer Event</p>
  //   </div>
  //   <div className="legend-item">
  //     <IconBs.BsSquareFill size={20} color="var(--color-pink)" />
  //     <p className="event-type">Outreach Event</p>
  //   </div>
  //   <div className="legend-item">
  //     <IconBs.BsSquareFill size={20} color="var(--color-light-purple)" />
  //     <p className="event-type">Other Event</p>
  //   </div>
  // </div>
  <div className="key-section">
    <p className="key-text">Key</p>
    <div className="volunteer-event-square" />
    <p className="volunteer-event-text">Volunteer Event</p>
    <div className="outreach-event-square" />
    <p className="outreach-event-text">Outreach Event</p>
    <div className="other-event-square" />
    <p className="other-event-text">Other Event</p>
  </div>
);

export default EventLegend;
