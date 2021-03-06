import React from 'react';
import PropTypes from 'prop-types';
import './editAvailability.css';
import ScheduleSelector from 'react-schedule-selector';

// IF WE WANT TO TRY FULLCAL AGAIN:
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import '@fullcalendar/daygrid/main.css';
// import '@fullcalendar/timegrid/main.css';

const EditAvailability = ({
  availabilityTimes, setAvailabilityTimes, startWeek,
}) => {
  const handleChange = (newSchedule) => {
    setAvailabilityTimes(newSchedule);
  };

  const renderCell = (time, selected, refSetter) => (
    <div
      className="grid-cell"
      style={{ backgroundColor: `${selected ? '#799CA8' : '#F2FBFC'}` }}
      ref={refSetter}
    >
      {' '}
    </div>
  );

  return (
    <div className="editAvailCard">
      <ScheduleSelector
        selection={availabilityTimes}
        selectionScheme="square"
        startDate={startWeek}
        numDays={7}
        minTime={0}
        maxTime={24}
        hourlyChunks={1}
        dateFormat="ddd"
        selectedColor="rgba(121, 156, 168, 1)"
        rowGap={1}
        columnGap={1}
        onChange={handleChange}
        renderDateCell={renderCell}
      />
    </div>
  );
};

EditAvailability.propTypes = {
  availabilityTimes: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  setAvailabilityTimes: PropTypes.func.isRequired,
  startWeek: PropTypes.instanceOf(Date).isRequired,
};

export default EditAvailability;
