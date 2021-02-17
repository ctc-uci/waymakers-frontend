import React from 'react';
import './eventLegend.css';
import * as IconBs from 'react-icons/bs';

const EventLegend = () => {
  console.log('hi');
  return (
    <div id="legend">
      <h3 id="legend-title">Key</h3>
      <div className="legend-item">
        <IconBs.BsSquareFill size={20} color="var(--color-golden-yellow)" />
        <p className="event-type">Volunteer Event</p>
      </div>
      <div className="legend-item">
        <IconBs.BsSquareFill size={20} color="var(--color-pink)" />
        <p className="event-type">Outreach Event</p>
      </div>
      <div className="legend-item">
        <IconBs.BsSquareFill size={20} color="var(--color-light-purple)" />
        <p className="event-type">Other Event</p>
      </div>
    </div>
  );
};

export default EventLegend;
