import React from 'react';
import './eventLegend.css';

const EventLegend = () => (
  <div className="legend-key-section">
    <p className="key-text">Key</p>
    <div className="legend-info">
      <div className="single-legend-element">
        <div className="volunteer-event-square" />
        <h1 className="volunteer-event-text">Volunteer Event</h1>
      </div>
      <div className="single-legend-element">
        <div className="outreach-event-square" />
        <h1 className="outreach-event-text">Outreach Event</h1>
      </div>
      <div className="single-legend-element">
        <div className="other-event-square" />
        <h1 className="other-event-text">Other Event</h1>
      </div>
    </div>
  </div>
);

export default EventLegend;
