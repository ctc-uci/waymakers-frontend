import React, { useState, useEffect } from 'react';
import VolunteerTable from './volunteerTable';
import VolunteerTableMobile from './volunteerTableMobile';
import useMobileWidth from '../../../../../common/useMobileWidth';
import { TitledCard } from '../../../../../common/Card';

import { WMKBackend } from '../../../../../common/utils';

import './listOfVolunteers.css';

const ListOfVolunteers = (prop) => {
  const isMobile = useMobileWidth();
  const [allVolunteers, setAllVolunteers] = useState([]);

  const [sortingMethod, setSortingMethod] = useState('0');

  const [totalHours, setTotalHours] = useState(0);

  const paramQuery = {
    params: {
      event: prop.event.id,
      sortingMethod,
    },
  };

  const getAllVolunteers = async () => {
    const volunteers = await WMKBackend.get('/volunteerData/all/', paramQuery);
    // TODO: remove this temporary overflow test
    setAllVolunteers([...volunteers.data,
      ...volunteers.data, ...volunteers.data, ...volunteers.data,
      ...volunteers.data, ...volunteers.data, ...volunteers.data,
      ...volunteers.data, ...volunteers.data, ...volunteers.data,
      ...volunteers.data, ...volunteers.data, ...volunteers.data,
      ...volunteers.data, ...volunteers.data, ...volunteers.data,
      ...volunteers.data, ...volunteers.data, ...volunteers.data]);
    console.log(volunteers.data);
    if (volunteers.data.length) {
      setTotalHours(
        volunteers.data.map((v) => v.sum).reduce((acc, v) => acc + v),
      );
    }
  };

  useEffect(() => {
    // TODO: havent confirmed if sorting works
    getAllVolunteers();
  }, [sortingMethod]);

  return (
    // <div className="list-of-volunteer">
    <TitledCard title="List of Volunteers" cardClassName="list-of-volunteer">
      <div className="sort-by-dropdown">
        Sort by:
        <select className="sort-by" value={sortingMethod} onChange={(e) => setSortingMethod(e.target.value)}>
          <option className="sort-by-items" value="0">A-Z</option>
          <option className="sort-by-items" value="1">Z-A</option>
          <option className="sort-by-items" value="2">Most Hours</option>
          <option className="sort-by-items" value="3">Least Hours</option>
        </select>
      </div>
      {isMobile
        ? (
          <VolunteerTableMobile data={allVolunteers} />
        ) : (
          <VolunteerTable data={allVolunteers} />
        )}
      <div className="total-stats">
        <p>
          Total People:
          {' '}
          {allVolunteers.length}
        </p>
        <p>
          Total Hours:
          {' '}
          {totalHours}
        </p>
      </div>
    </TitledCard>
    // </div>
  );
};

export default ListOfVolunteers;
