import React, { useState, useEffect } from 'react';
import {
  startOfWeek, add, getHours, getDay,
} from 'date-fns';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import disableScroll from 'disable-scroll';

import { WMKBackend } from '../../../../common/utils';

import ViewAvailability from './viewAvailability/viewAvailability';
import EditAvailability from './editAvailability/editAvailability';
import HelpPopup from '../help-popup/helpPopup';

import { createAlert } from '../../../../common/AlertBanner/AlertBannerSlice';

import './volunteerAvailability.css';

const VolunteerAvailability = (props) => {
  const dispatch = useDispatch();
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
    dispatch(createAlert({
      message: 'Successfully updated availability hours!',
      severity: 'success',
    }));
  };

  const onHelpButtonClick = () => {
    if (helpPopupSeen) {
      disableScroll.off();
    } else {
      disableScroll.on();
    }
    setHelpPopupSeen(!helpPopupSeen);
  };

  useEffect(async () => {
    setLoading(true);
    getAvailability();
    setLoading(false);
  }, []);

  if (isLoading) {
    return (<div>Loading availability...</div>);
  }

  return (
    <div className="volunteer-availability">
      <div className="availability-header">
        <h4 className="availability-title">Availability for the Week</h4>
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
                <p className="medium">Change Availability</p>
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
                <p className="medium">Save Changes</p>
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
      <div className="volunteer-avail-card">
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
      {helpPopupSeen && <HelpPopup onHelpButtonClick={onHelpButtonClick} type="volunteer" />}
    </div>
  );
};

VolunteerAvailability.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(VolunteerAvailability);
