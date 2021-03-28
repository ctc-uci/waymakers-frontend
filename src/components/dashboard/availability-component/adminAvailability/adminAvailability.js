/* eslint-disable react/prop-types */
import React, { useState } from 'react';
// import React from 'react';
import './adminAvailability.css';
import ScheduleSelector from 'react-schedule-selector';

function AdminAvailability({
  startWeek, allAvailability, freqMap, maxFreq, nameMap,
}) {
  const [currentDate, setCurrentDate] = useState('');
  // const currentDate = new Date('2021-03-23T00:00:00.000Z');
  const handleChange = () => {
    console.log('');
  };

  // lightest shade: rgb(219, 237, 255)
  // darkest shade: rgb(0, 127, 255)
  // values of r and g change with availability values
  function calculateShade(time) {
    // console.log(JSON.stringify(time), Number(freqMap.get(JSON.stringify(time))));
    // console.log('maxFreq', maxFreq);
    // console.log(Number(freqMap.get(JSON.stringify(time))), Number(maxFreq));
    const currFreq = Number(freqMap.get(JSON.stringify(time)));
    const frac = (Number.isNaN(currFreq) ? 0 : currFreq) / Number(maxFreq);
    const r = 219 - frac * 219;
    const g = 237 - frac * 110;
    return `rgb(${r},${g},255)`;
  }

  function renderCell(time, selected, refSetter) {
    // console.log('time', time, 'bgcolor', calculateShade(time));
    return (
      <div
        className="grid-cell"
        onMouseEnter={() => setCurrentDate(time)}
        style={{ backgroundColor: calculateShade(time) }}
        ref={refSetter}
      />
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

  return (
    <div>
      <div className="adminAvailCard" onMouseLeave={() => setCurrentDate('')}>
        <h5 className="availability-title">Availability for the Week</h5>
        <ScheduleSelector
          selection={allAvailability}
          selectionScheme="square"
          startDate={startWeek}
          numDays={7}
          minTime={7}
          maxTime={19}
          hourlyChunks={1}
          dateFormat="ddd"
          onChange={handleChange}
          renderDateCell={renderCell}
        />
      </div>
      { currentDate && displayNames() }
    </div>
  );
}

export default AdminAvailability;
