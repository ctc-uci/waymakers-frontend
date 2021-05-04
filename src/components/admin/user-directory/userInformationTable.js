import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { TitledCard } from '../../../common/Card';
import UpdateUserModal from './updateUserModal';
import UserDirectoryRow from './userDirectoryRow';
import {
  Table, TableHeader, TableColumnHeader, TableBody, TableRow,
} from '../../../common/Table';

import back from '../../../assets/pageBack.svg';
import forward from '../../../assets/pageForward.svg';

import './userInformationTable.css';

const ROWS_PER_PAGINATION = 6;

const SORT_BY_OPTIONS = [
  {
    displayName: 'Division',
    compareFunc: (a, b) => (a.division > b.division ? 1 : -1),
  },
  {
    displayName: 'Alphabetical',
    compareFunc: (a, b) => (a.lastname.toUpperCase() > b.lastname.toUpperCase() ? 1 : -1),
  },
];

const UserInformationTable = ({ title, users, divisionList }) => {
  const [paginatedIndex, setPaginatedIndex] = useState(0);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [sortByOption, setSortByOption] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUser, setModalUser] = useState({});

  useEffect(() => {
    setTotalNumberOfPages(Math.ceil(users.length / ROWS_PER_PAGINATION));
  }, [users, paginatedIndex, sortByOption, searchTerm]);

  const paginatedVolunteers = useMemo(() => {
    if (!users) { return []; }
    return users
      .filter((user) => (
        user.firstname.toLowerCase().includes(searchTerm.toLowerCase()))
        || user.lastname.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort(SORT_BY_OPTIONS[sortByOption].compareFunc)
      .slice(paginatedIndex * ROWS_PER_PAGINATION, (paginatedIndex + 1) * ROWS_PER_PAGINATION);
  }, [users, paginatedIndex, sortByOption, searchTerm]);

  const openModal = (user) => {
    setModalUser(user);
    setIsModalOpen(true);
  };

  return (
    <TitledCard title={title} className="user-table-wrapper" cardClassName="card-inner">
      <UpdateUserModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userInfo={modalUser}
        divisionList={divisionList}
      />
      <div className="table-topbar">
        <div className="search-section">
          <p className="medium">Search:</p>
          &nbsp;
          <input
            type="text"
            className="user-search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="sort-section">
          <p className="medium">Sort:</p>
          &nbsp;
          <select className="user-sort" value={sortByOption} onChange={(e) => setSortByOption(e.target.value)}>
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
      </div>
      <Table className="user-table">
        <TableHeader>
          <TableRow>
            <TableColumnHeader className="user-table-header">Name</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.values(paginatedVolunteers)
            .map((user) => (
              <UserDirectoryRow
                key={user.userid}
                user={user}
                openModal={openModal}
                divisionList={divisionList}
              />
            ))}
        </TableBody>
      </Table>
      <p className="total-people-counter large">
        Total People:
        {' '}
        {users.length}
      </p>
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
    </TitledCard>
  );
};

UserInformationTable.propTypes = {
  title: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  divisionList: PropTypes.object.isRequired,
};

export default UserInformationTable;
