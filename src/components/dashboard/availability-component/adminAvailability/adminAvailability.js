/* eslint-disable react/prop-types */
import React from 'react';
import './adminAvailability.css';
import ScheduleSelector from 'react-schedule-selector';

function AdminAvailability({
  startWeek, allAvailability, freqMap, maxFreq,
}) {
  const handleChange = () => {
    console.log('');
  };

  // lightest shade: rgb(219, 237, 255)
  // darkest shade: rgb(0, 127, 255)
  // values of r and g change with availability values
  function calculateShade(time) {
    console.log(JSON.stringify(time), Number(freqMap.get(JSON.stringify(time))));
    // console.log('maxFreq', maxFreq);
    // console.log(Number(freqMap.get(JSON.stringify(time))), Number(maxFreq));
    const currFreq = Number(freqMap.get(JSON.stringify(time)));
    const frac = (Number.isNaN(currFreq) ? 0 : currFreq) / Number(maxFreq);
    const r = 219 - frac * 219;
    const g = 237 - frac * 110;
    return `rgb(${r},${g},255)`;
  }

  function renderCell(time, selected, refSetter) {
    console.log('time', time, 'bgcolor', calculateShade(time));
    return (
      <div className="grid-cell" style={{ backgroundColor: calculateShade(time) }} ref={refSetter}>
        {/* <p className="cell-text">{freqMap.get(JSON.stringify(time))}</p> */}
      </div>
    );
  }
  return (
    <div>
      <div className="adminAvailCard">
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
      <div>
        <p>Names</p>
      </div>
    </div>
  );
}

export default AdminAvailability;
