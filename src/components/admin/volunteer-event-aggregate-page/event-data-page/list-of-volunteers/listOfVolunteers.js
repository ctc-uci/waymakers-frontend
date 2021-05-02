import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { WMKBackend } from '../../../../../common/utils';
import useMobileWidth from '../../../../../common/useMobileWidth';

import { TitledCard } from '../../../../../common/Card';
import VolunteerTable from './volunteerTable';
import VolunteerTableMobile from './volunteerTableMobile';

import back from '../../../../../assets/pageBack.svg';
import forward from '../../../../../assets/pageForward.svg';

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

const ListOfVolunteers = ({ eventId }) => {
  const [allVolunteers, setAllVolunteers] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [sortByOption, setSortByOption] = useState(0);
  const [paginatedIndex, setPaginatedIndex] = useState(0);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);

  const isMobile = useMobileWidth();

  const paginatedVolunteers = useMemo(() => {
    if (!allVolunteers) { return []; }
    return allVolunteers
      .sort(SORT_BY_OPTIONS[sortByOption].compareFunc)
      .slice(paginatedIndex * ROWS_PER_PAGINATION, (paginatedIndex + 1) * ROWS_PER_PAGINATION);
  }, [allVolunteers, paginatedIndex, sortByOption]);

  const getAllVolunteers = async () => {
    // console.log(eventId);
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
    //   userid: `3K1HBRGdf2cMKvROFIhBF322gZy2-${i}`,
    //   verified: true,
    // }));
    // setAllVolunteers(TEST_DATA);
    // setTotalNumberOfPages(Math.ceil(TEST_DATA.length / ROWS_PER_PAGINATION));
    // setTotalHours(TEST_DATA
    //   .map((v) => v.sum)
    //   .reduce((acc, v) => acc + v, 0));

    const volunteers = await WMKBackend.get('/volunteerData/all/', {
      params: {
        event: eventId,
      },
    });
    setAllVolunteers(volunteers.data);
    setTotalNumberOfPages(Math.ceil(volunteers.data.length / ROWS_PER_PAGINATION));
    setTotalHours(volunteers.data
      .map((v) => v.sum)
      .reduce((acc, v) => acc + v, 0));
  };

  useEffect(() => {
    getAllVolunteers();
  }, []);

  return (
    <TitledCard title="List of Volunteers" className="list-of-volunteer-container" cardClassName="list-of-volunteer">
      <div className="sort-by-dropdown">
        Sort by:
        <select className="sort-by" value={sortByOption} onChange={(e) => setSortByOption(e.target.value)}>
          {SORT_BY_OPTIONS.map((sortOption, i) => (
            <option
              key={sortOption.displayName}
              className="sort-by-items"
              value={i}
            >
              {sortOption.displayName}
            </option>
          ))}
        </select>
      </div>
      {isMobile
        ? (
          <VolunteerTableMobile data={paginatedVolunteers} />
        ) : (
          <VolunteerTable data={paginatedVolunteers} />
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
  );
};

ListOfVolunteers.propTypes = {
  eventId: PropTypes.string.isRequired,
};

export default ListOfVolunteers;
