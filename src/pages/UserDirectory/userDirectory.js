import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';

import { WMKBackend } from '../../common/utils';

import UserInformationTable from '../../components/admin/user-directory/userInformationTable';
import DivisionMenu from '../../components/admin/user-directory/udDivisionMenu';

import './userDirectory.css';

const UserDirectory = () => {
  const [currentDivision, setCurrentDivision] = useState('All Divisions');
  const [divisionList, setDivisionList] = useState({});
  const [volunteers, setVolunteers] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isAddDivisionModalOpen, setIsAddDivisionModalOpen] = useState(false);
  const [modalUser, setModalUser] = useState({});

  const filteredVolunteers = useMemo(
    () => volunteers.filter((user) => currentDivision === 'All Divisions' || user.div_name === currentDivision),
    [currentDivision, volunteers],
  );
  const filteredAdmins = useMemo(
    () => admins.filter((user) => currentDivision === 'All Divisions' || user.div_name === currentDivision),
    [currentDivision, admins],
  );
  const filteredStaffs = useMemo(
    () => staffs.filter((user) => currentDivision === 'All Divisions' || user.div_name === currentDivision),
    [currentDivision, staffs],
  );

  useEffect(async () => {
    try {
      const [accounts, divisions] = await Promise.all([
        WMKBackend.get('/accounts'),
        WMKBackend.get('/divisions'),
      ]);

      setVolunteers(accounts.data.filter((user) => user.permissions === 'Volunteer'));
      setStaffs(accounts.data.filter((user) => user.permissions === 'Staff'));
      setAdmins(accounts.data.filter((user) => user.permissions === 'Admin'));

      // Converting array of objects into an associative array
      const divList = divisions.data.reduce(
        (obj, item) => Object.assign(obj, { [item.id]: item }), {},
      );
      setDivisionList(divList);
    } catch (err) {
      console.log(err);
    }
  }, [isEditUserModalOpen, isAddDivisionModalOpen]);

  return (
    <div className="user-directory-page">
      <Helmet>
        <title>Waymakers | User Directory</title>
      </Helmet>
      <h2 className="user-directory-title">User Directory</h2>
      <DivisionMenu
        divisionList={divisionList}
        currentDivision={currentDivision}
        setCurrentDivision={setCurrentDivision}
        isOpen={isAddDivisionModalOpen}
        setIsOpen={setIsAddDivisionModalOpen}
      />
      <UserInformationTable
        title="Volunteers"
        users={filteredVolunteers}
        divisionList={divisionList}
        isModalOpen={isEditUserModalOpen}
        setIsModalOpen={setIsEditUserModalOpen}
        modalUser={modalUser}
        setModalUser={setModalUser}
      />
      <UserInformationTable
        title="Admins"
        users={filteredAdmins}
        divisionList={divisionList}
        isModalOpen={isEditUserModalOpen}
        setIsModalOpen={setIsEditUserModalOpen}
        modalUser={modalUser}
        setModalUser={setModalUser}
      />
      <UserInformationTable
        title="Staff"
        users={filteredStaffs}
        divisionList={divisionList}
        isModalOpen={isEditUserModalOpen}
        setIsModalOpen={setIsEditUserModalOpen}
        modalUser={modalUser}
        setModalUser={setModalUser}
      />
    </div>
  );
};

export default UserDirectory;
