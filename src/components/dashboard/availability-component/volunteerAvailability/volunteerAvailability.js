import React, { useState, useEffect } from 'react';
import {
  startOfWeek, add, getHours, getDay,
} from 'date-fns';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import disableScroll from 'disable-scroll';

import { WMKBackend } from '../../../../common/utils';

import ViewAvailability from './viewAvailability/viewAvailability';
import EditAvailability from './editAvailability/editAvailability';
import HelpPopup from '../help-popup/helpPopup';

import './volunteerAvailability.css';

const VolunteerAvailability = (props) => {
  const { cookies } = props;
  const [availability, setAvailability] = useState([]);
  const [availabilityMode, setAvailabilityMode] = useState('view');
  const [isLoading, setLoading] = useState(false);
  const [helpPopupSeen, setHelpPopupSeen] = useState(false);

  const startWeek = startOfWeek(new Date());

  const stringToDate = (dateString) => {
    const {
      dayofweek, starttime,
    } = dateString;

    const splitTime = String(starttime).split(':');
    const date = add(startWeek, {
      years: 0,
      months: 0,
      weeks: 0,
      days: dayofweek,
      hours: splitTime[0],
      minutes: 0,
      seconds: 0,
    });

    return date;
  };

  const parseDate = (date) => {
    const hours = getHours(date);
    return [getDay(date), `${hours}:00:00`];
  };

  const getAvailability = async () => {
    try {
      const userID = cookies.get('userId');

      const availabilityResult = await WMKBackend.get(`/availability/${userID}`);

      const { userAvailability } = availabilityResult.data;
      const dateList = userAvailability.map((dateString) => (stringToDate(dateString)));
      setAvailability(dateList);
    } catch (e) {
      console.log('Error while getting availability from the backend!');
    }
  };

  const updateAvailability = async () => {
    const dateList = availability.map((date) => (parseDate(date)));
    const seen = new Set();

    const filteredDates = dateList.filter((date) => {
      const duplicate = seen.has(date.toString());
      seen.add(date.toString());
      return !duplicate;
    });

    const userID = cookies.get('userId');

    await WMKBackend.post(`/availability/${userID}`, {
      dates: filteredDates,
    });

    setAvailabilityMode('view');
  };

  const onHelpButtonClick = () => {
    if (helpPopupSeen) {
      disableScroll.off();
    } else {
      disableScroll.on();
    }
    setHelpPopupSeen(!helpPopupSeen);
  };

  function renderAvailability() {
    return (
      <div className="availability-wrapper">
        <div className="availability-header">
          <h2 className="availability-title">Availability for the Week</h2>
          <div className="availability-buttons-container">
            {availabilityMode === 'view'
              ? (
                <div
                  className="availability-edit-button"
                  onClick={() => { setAvailabilityMode('edit'); }}
                  onKeyDown={() => { setAvailabilityMode('edit'); }}
                  role="button"
                  tabIndex={0}
                >
                  Change Availability
                </div>
              )
              : (
                <div
                  className="availability-save-button"
                  onClick={updateAvailability}
                  onKeyDown={updateAvailability}
                  role="button"
                  tabIndex={0}
                >
                  Save Changes
                </div>
              )}
            <div
              className="help-popup-button"
              onClick={onHelpButtonClick}
              onKeyDown={onHelpButtonClick}
              role="button"
              tabIndex={0}
            >
              ?
            </div>
          </div>
        </div>
        { availabilityMode === 'view'
          ? (<ViewAvailability availabilities={availability} startWeek={startWeek} />)
          : (
            <EditAvailability
              availabilityTimes={availability}
              setAvailabilityTimes={setAvailability}
              startWeek={startWeek}
            />
          )}
      </div>
    );
  }

  useEffect(async () => {
    setLoading(true);
    getAvailability();
    setLoading(false);
  }, []);

  if (isLoading) {
    return (<div>Loading availability...</div>);
  }

  return (
    <div className="volunteer-availability-section">
      {renderAvailability()}
      {helpPopupSeen && <HelpPopup onHelpButtonClick={onHelpButtonClick} type="volunteer" />}
    </div>
  );
};

VolunteerAvailability.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(VolunteerAvailability);
