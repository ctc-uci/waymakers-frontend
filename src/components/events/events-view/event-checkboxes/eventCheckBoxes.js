import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Icon from 'react-icons/im';
import Checkbox from 'react-custom-checkbox';

import './eventCheckBoxes.css';

const EventCheckBoxes = ({
  showMoreEvents, showMyEvents, onMoreClick, onMyClick,
}) => {
  const [moreEventsBackground, setMoreEventsBackground] = useState('var(--color-dark-blue)');
  const [myEventsBackground, setMyEventsBackground] = useState('var(--color-light-green)');
  return (
    <div id="event-checkboxes">
      <div className="check-box">
        <Checkbox
          checked={showMoreEvents}
          icon={<Icon.ImCheckmark color="white" size={20} />}
          borderColor="#174A41"
          borderRadius={4}
          style={{
            display: 'flex',
            flex: 1,
            backgroundColor: moreEventsBackground,
            alignSelf: 'stretch',
            cursor: 'pointer',
          }}
          size={30}
          label="More Events"
          labelStyle={{
            color: 'var(--text-color-dark)',
            marginLeft: '0.5em',
            fontWeight: 'bold',
          }}
          onChange={(value) => {
            if (value === true) {
              // change border color
              setMoreEventsBackground('var(--color-dark-blue)');
            } else {
              setMoreEventsBackground('transparent');
            }
            onMoreClick(value); // changes showMoreEvents state in EventsView
          }}
        />
      </div>
      <div className="check-box">
        <Checkbox
          checked={showMyEvents}
          icon={<Icon.ImCheckmark color="white" size={20} />}
          borderColor="var(--color-light-green)"
          // borderWidth={0}
          borderRadius={4}
          style={{
            display: 'flex',
            flex: 1,
            backgroundColor: myEventsBackground,
            alignSelf: 'stretch',
            cursor: 'pointer',
          }}
          size={30}
          label="My Events"
          labelStyle={{
            color: 'var(--text-color-dark)',
            marginLeft: '0.5em',
            fontWeight: 'bold',
          }}
          onChange={(value) => {
            if (value === true) {
              // change border color
              setMyEventsBackground('var(--color-light-green)');
            } else {
              setMyEventsBackground('transparent');
            }
            onMyClick(value); // changes showMyEvents state in EventsView
          }}
        />
      </div>
    </div>
  );
};

EventCheckBoxes.propTypes = {
  showMoreEvents: PropTypes.bool.isRequired,
  showMyEvents: PropTypes.bool.isRequired,
  onMoreClick: PropTypes.func.isRequired,
  onMyClick: PropTypes.func.isRequired,
};

export default EventCheckBoxes;
