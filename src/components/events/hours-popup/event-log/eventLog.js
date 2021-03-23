import React from 'react';
import Datetime from 'react-datetime';
// import PropTypes from 'prop-types';
import 'react-datetime/css/react-datetime.css';

const EventLog = (prop) => (
  <div className="EventLog">
    <div>Start Time</div>
    <Datetime
      className="startLog"
      onChange={(e) => prop.logChange(prop.index, true, e)}
      required
    />
    <div>End Time</div>
    <Datetime
      className="endLog"
      onChange={(e) => prop.logChange(prop.index, false, e)}
      required
    />
  </div>
);

export default EventLog;
