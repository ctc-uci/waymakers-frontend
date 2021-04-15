import React, { useState, useEffect } from 'react';
import {
  startOfWeek, add,
} from 'date-fns';
import ScheduleSelector from 'react-schedule-selector';

import { WMKBackend } from '../../../../common/utils';

import './adminAvailability.css';

const AdminAvailability = () => {
  const startWeek = startOfWeek(new Date());
  const [currentDate, setCurrentDate] = useState('');
  const [allAvailability, setAllAvailability] = useState([]);
  const [freqMap, setfreqMap] = useState(new Map());
  const [nameMap, setNameMap] = useState(new Map());
  const [maxFreq, setMaxFreq] = useState(0);
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
  // values of r and g change with availability values
  function calculateShade(time) {
    const currFreq = Number(freqMap.get(JSON.stringify(time)));
    const frac = (Number.isNaN(currFreq) ? 0 : currFreq) / Number(maxFreq);
    const r = 219 - frac * 219;
    const g = 237 - frac * 110;
    return `rgb(${r},${g},255)`;
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

  if (isLoading) {
    return (<div>Loading dashboard...</div>);
  }

  return (
    <>
      <div className="adminAvailCard">
        <ScheduleSelector
          selection={allAvailability}
          selectionScheme="square"
          startDate={startWeek}
          numDays={7}
          minTime={7}
          maxTime={19}
          hourlyChunks={1}
          dateFormat="ddd"
          renderDateCell={renderCell}
        />
      </div>
      { currentDate && displayNames() }
    </>
  );
};

export default AdminAvailability;
