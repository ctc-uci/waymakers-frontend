import React, { useState, useEffect } from 'react';
import {
  startOfWeek, add,
} from 'date-fns';
import disableScroll from 'disable-scroll';
import ScheduleSelector from 'react-schedule-selector';
import HelpPopup from '../help-popup/helpPopup';

import { WMKBackend } from '../../../../common/utils';

import './adminAvailability.css';

const AdminAvailability = () => {
  const startWeek = startOfWeek(new Date());
  const [currentDate, setCurrentDate] = useState('');
  const [allAvailability, setAllAvailability] = useState([]);
  const [freqMap, setfreqMap] = useState(new Map());
  const [nameMap, setNameMap] = useState(new Map());
  const [maxFreq, setMaxFreq] = useState(0);
  const [helpPopupSeen, setHelpPopupSeen] = useState(false);
  const [isLoading, setLoading] = useState(false);

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

  async function getAvailability() {
    try {
      const allAvailabilityResult = await WMKBackend.get('/availability/counts');

      const availabilityNamesResult = await WMKBackend.get('/availability/names');

      // handling all users' availability
      let { usersAvailability } = allAvailabilityResult.data;

      console.log('availability/counts data:', usersAvailability);

      const frequencyMap = new Map();

      usersAvailability = usersAvailability.map((dateString) => {
        const {
          dayofweek, starttime, count,
        } = dateString;

        const parsedDate = stringToDate({ dayofweek, starttime });
        frequencyMap.set(JSON.stringify(parsedDate), Number(count));

        return {
          date: parsedDate,
          freq: Number(count),
        };
      });

      setAllAvailability(usersAvailability);
      setfreqMap(frequencyMap);
      setMaxFreq(Math.max(...usersAvailability.map((el) => el.freq), 0));

      const namesMap = new Map();

      console.log('availability/names data:', availabilityNamesResult.data);

      availabilityNamesResult.data.availabilityNames.forEach((dateString) => {
        const {
          dayofweek, starttime, firstname, lastname, locationcity, phone, email,
        } = dateString;

        const parsedDate = stringToDate({ dayofweek, starttime });

        const dateValue = namesMap.get(JSON.stringify(parsedDate));

        if (dateValue === undefined) {
          namesMap.set(JSON.stringify(parsedDate), [
            {
              fname: firstname, lname: lastname, city: locationcity, phone, email,
            },
          ]);
        } else {
          dateValue.push({
            fname: firstname, lname: lastname, city: locationcity, phone, email,
          });
          namesMap.set(JSON.stringify(parsedDate), dateValue);
        }

        return null;
      });

      setAllAvailability(usersAvailability);
      setNameMap(namesMap);
    } catch (e) {
      // eslint-disable-next-line
      console.log('Error:', e);
      console.log('Error while getting availability from the backend!');
    }
  }

  // lightest shade: rgb(219, 237, 255)
  // darkest shade: rgb(0, 127, 255)

  // lightest shade: rgb(121, 156, 168)
  // darkest shade: rgb(0, 62, 83)
  // values of r and g change with availability values
  // eslint-disable-next-line no-unused-vars
  function calculateShade(time) {
    const currFreq = Number(freqMap.get(JSON.stringify(time)));
    const frac = (Number.isNaN(currFreq) ? 0 : currFreq) / Number(maxFreq);
    const r = 121 - frac * 121;
    const g = 156 - frac * 94;
    const b = 168 - frac * 85;
    const color = frac === 0 ? 'rgb(242, 251, 252)' : `rgb(${r},${g},${b})`;
    // eslint-disable-next-line max-len
    // const nameList = nameMap.get(JSON.stringify(time)) === undefined ? 0 : nameMap.get(JSON.stringify(time)).length;
    // const nameCount = freqMap.get(JSON.stringify(time)) || 0;
    // const maxCount = maxFreq;
    // console.log(`${JSON.stringify(time)}: ${nameCount} / ${maxCount}, color: ${color}`);
    return color;
  }

  function renderCell(time, selected, refSetter) {
    return (
      <div
        className="grid-cell"
        onClick={() => setCurrentDate(time)}
        onKeyDown={() => setCurrentDate(time)}
        style={{ backgroundColor: calculateShade(time) }}
        ref={refSetter}
        role="button"
        tabIndex={0}
      >
        {' '}
      </div>
    );
  }

  function displayNames() {
    const weekday = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(currentDate);

    const calendarDate = new Intl.DateTimeFormat('en', {
      year: 'numeric', month: 'numeric', day: 'numeric',
    }).format(currentDate);

    const startTime = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' }).format(currentDate);
    const nextHour = new Date(currentDate);
    nextHour.setHours(nextHour.getHours() + 1);
    const endTime = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' }).format(nextHour);

    const nameList = nameMap.get(JSON.stringify(currentDate));
    const nameCount = freqMap.get(JSON.stringify(currentDate)) || 0;

    console.log('nameMap', nameMap);
    return (
      <div className="avail-names-section">
        <div className="admin-avail-title-section">
          <h3 className="admin-avail-date">
            { `${weekday} ${calendarDate} ${startTime}-${endTime}`}
          </h3>
          <h3 className="num-available-title">
            {`${nameCount} / ${maxFreq} Available`}
          </h3>
        </div>
        { nameList === undefined
          ? (<p className="no-members-message">No available members at this time!</p>)
          : (
            <table className="names-table">
              <tbody>
                {
                nameList.map((person) => (
                  <tr>
                    <td>
                      {person.fname}
                      {' '}
                      {person.lname}
                    </td>
                    <td>
                      {person.email}
                    </td>
                    <td>
                      {person.phone}
                    </td>
                    <td>
                      {person.city}
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          )}
      </div>
    );
  }

  useEffect(async () => {
    setLoading(true);
    getAvailability();
    setLoading(false);
  }, []);

  const onHelpButtonClick = () => {
    if (helpPopupSeen) {
      disableScroll.off();
    } else {
      disableScroll.on();
    }
    setHelpPopupSeen(!helpPopupSeen);
  };

  if (isLoading) {
    return (<div>Loading dashboard...</div>);
  }

  return (
    <div className="admin-availability-container">
      <div className="availability-header">
        <h4 className="availability-title">
          Volunteer On-Call Availability
        </h4>
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
      <div className="schedule-table">
        <div className="schedule-selector-wrapper">
          <ScheduleSelector
            selection={allAvailability}
            selectionScheme="square"
            startDate={startWeek}
            numDays={7}
            minTime={0}
            maxTime={24}
            hourlyChunks={1}
            rowGap={0}
            columnGap={0}
            dateFormat="ddd"
            renderDateCell={renderCell}
          />
        </div>
      </div>
      { currentDate && displayNames() }
      {helpPopupSeen && <HelpPopup onHelpButtonClick={onHelpButtonClick} type="admin" />}
    </div>
  );
};

export default AdminAvailability;
