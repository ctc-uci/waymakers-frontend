import React, { useState, useEffect, useMemo } from 'react';
import VolunteerTable from './volunteerTable';
import VolunteerTableMobile from './volunteerTableMobile';
import useMobileWidth from '../../../../../common/useMobileWidth';
import { TitledCard } from '../../../../../common/Card';
import back from '../../../../../assets/pageBack.svg';
import forward from '../../../../../assets/pageForward.svg';
import { WMKBackend } from '../../../../../common/utils';

import './listOfVolunteers.css';

const ROWS_PER_PAGINATION = 6;

const SORT_BY_OPTIONS = [
  {
    displayName: 'Last Name A-Z',
    compareFunc: (a, b) => (a.lastname > b.lastname ? 1 : -1),
  },
  {
    displayName: 'Last Name Z-A',
    compareFunc: (a, b) => (a.lastname < b.lastname ? 1 : -1),
  },
  {
    displayName: 'Most Hours',
    compareFunc: (a, b) => (a.sum < b.sum ? 1 : -1),
  },
  {
    displayName: 'Least Hours',
    compareFunc: (a, b) => (a.sum > b.sum ? 1 : -1),
  },
];

const ListOfVolunteers = (prop) => {
  const isMobile = useMobileWidth();
  const [allVolunteers, setAllVolunteers] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [sortByOption, setSortByOption] = useState(0);
  const [paginatedIndex, setPaginatedIndex] = useState(0);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);

  const paginatedVolunteers = useMemo(() => {
    if (!allVolunteers) { return []; }
    return allVolunteers
      .sort(SORT_BY_OPTIONS[sortByOption].compareFunc)
      .slice(paginatedIndex * ROWS_PER_PAGINATION, (paginatedIndex + 1) * ROWS_PER_PAGINATION);
  }, [allVolunteers, paginatedIndex, sortByOption]);

  const paramQuery = {
    params: {
      event: prop.event.id,
    },
  };

  const getAllVolunteers = async () => {
    // const TEST_DATA = [...Array(103)].map((a, i) => ({
    //   birthdate: '2021-01-24T08:00:00.000Z',
    //   date_part: 0,
    //   division: null,
    //   email: 'admin@uci.edu',
    //   firstname: `AdminFirst${i}`,
    //   gender: 'Prefer Not To Say',
    //   lastname: `AdminLast${i}`,
    //   location_street_2: null,
    //   locationcity: 'Irvine',
    //   locationstate: 'CA',
    //   locationstreet: '1 Test Street',
    //   locationzip: 92697,
    //   permissions: 'Admin',
    //   phone: '5101234567',
    //   profile_picture: 'https://wmk-dev-1.s3.us-west-1.amazonaws.com/3K1HBRGdf2cMKvROFIhBF322gZy21',
    //   sum: i,
    //   tier: 1,
    //   userid: '3K1HBRGdf2cMKvROFIhBF322gZy2',
    //   verified: true,
    // }));
    // setAllVolunteers(TEST_DATA);
    // setTotalNumberOfPages(Math.ceil(TEST_DATA.length / ROWS_PER_PAGINATION));
    // setTotalHours(TEST_DATA
    //   .map((v) => v.sum)
    //   .reduce((acc, v) => acc + v, 0));

    const volunteers = await WMKBackend.get('/volunteerData/all/', paramQuery);
    // console.log(volunteers.data);
    setAllVolunteers(volunteers.data);
    setTotalNumberOfPages(Math.ceil(volunteers.data.length / ROWS_PER_PAGINATION));
    setTotalHours(volunteers.data
      .map((v) => v.sum)
      .reduce((acc, v) => acc + v, 0));
  };

  useEffect(() => {
    getAllVolunteers();
    console.log(allVolunteers);
  }, []);

  return (
    // <div className="list-of-volunteer">
    <TitledCard title="List of Volunteers" className="list-of-volunteer-container" cardClassName="list-of-volunteer">
      <div className="sort-by-dropdown">
        Sort by:
        <select className="sort-by" value={sortByOption} onChange={(e) => setSortByOption(e.target.value)}>
          {SORT_BY_OPTIONS.map((sortOption, i) => <option className="sort-by-items" value={i}>{sortOption.displayName}</option>)}
        </select>
      </div>
      {isMobile
        ? (
          <VolunteerTableMobile data={paginatedVolunteers} profilePicture={prop.profilePicture} />
        ) : (
          <VolunteerTable data={paginatedVolunteers} profilePicture={prop.profilePicture} />
        )}
      <br />
      <div className="pagination-indicator">
        <button type="button" onClick={() => { setPaginatedIndex((old) => Math.max(0, old - 1)); }}>
          <img src={back} alt="back page" />
        </button>
        <div>{totalNumberOfPages === 0 ? 0 : paginatedIndex + 1}</div>
        <div>/</div>
        <div>{totalNumberOfPages}</div>
        <button type="button" onClick={() => { setPaginatedIndex((old) => Math.min(totalNumberOfPages - 1, old + 1)); }}>
          <img src={forward} alt="next page" />
        </button>
      </div>
      <div className="total-stats">
        <p className="large bold">
          Total People:
          {' '}
          {allVolunteers.length}
        </p>
        <p className="large bold">
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
