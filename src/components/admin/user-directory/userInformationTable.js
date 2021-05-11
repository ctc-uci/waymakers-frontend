import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import usePaginationController from '../../../common/usePaginationController';

import PaginationController from '../../../common/PaginationController/PaginationController';
import { TitledCard } from '../../../common/Card';
import {
  Table, TableHeader, TableColumnHeader, TableBody, TableRow,
} from '../../../common/Table';

import UpdateUserModal from './updateUserModal';
import UserDirectoryRow from './userDirectoryRow';

import './userInformationTable.css';

// const SORT_BY_OPTIONS = [
//   {
//     displayName: 'Division',
//     compareFunc: (a, b) => (a.division > b.division ? 1 : -1),
//   },
//   {
//     displayName: 'Alphabetical',
//     compareFunc: (a, b) => (a.lastname.toUpperCase() > b.lastname.toUpperCase() ? 1 : -1),
//   },
// ];

const UserInformationTable = ({
  title,
  users,
  divisionList,
  isModalOpen,
  setIsModalOpen,
  modalUser,
  setModalUser,
}) => {
  // const [sortByOption, setSortByOption] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!users) { return []; }
    return users
      .filter((user) => (
        user.firstname.toLowerCase().includes(searchTerm.toLowerCase()))
        || user.lastname.toLowerCase().includes(searchTerm.toLowerCase()));
    // .sort(SORT_BY_OPTIONS[sortByOption].compareFunc);
  });
  const [
    paginatedData, paginatedIndex, setPaginatedIndex, totalNumberOfPages,
  ] = usePaginationController(filteredData);

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
        {/* <div className="sort-section">
          <p className="medium">Sort:</p>
          &nbsp;
          <select
            className="user-sort"
            value={sortByOption}
            onChange={(e) => setSortByOption(e.target.value)}
          >
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
        </div> */}
      </div>
      <Table className="user-table">
        <TableHeader>
          <TableRow>
            <TableColumnHeader className="user-table-header">Name</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.values(paginatedData)
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
      <PaginationController
        paginatedIndex={paginatedIndex}
        setPaginatedIndex={setPaginatedIndex}
        totalNumberOfPages={totalNumberOfPages}
      />
    </TitledCard>
  );
};

UserInformationTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  modalUser: PropTypes.object.isRequired,
  setModalUser: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  divisionList: PropTypes.object.isRequired,
};

export default UserInformationTable;
