import React from 'react';
import './eventLegend.css';

const EventLegend = () => (
  <div className="legend-key-section">
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
