/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { withCookies } from 'react-cookie';

import { WMKBackend } from '../../common/utils';

import AdminEventsPreview from '../../components/dashboard/AdminEventsPreview/AdminEventsPreview';
import AdminInventoryPreview from '../../components/dashboard/AdminInventoryPreview/AdminInventoryPreview';
import AdminAvailability from '../../components/dashboard/availability-component/adminAvailability/adminAvailability';
import TitledCard from '../../common/Card/TitledCard';

import './adminDashboard.css';

const AdminDashboard = () => {
  const [isLoading, setLoading] = useState(false);
  const [divisionList, setDivisionList] = useState([]);
  const [currDivision, setCurrDivision] = useState(0);

  // Get user's most recent division (if any)
  useEffect(() => {
    const division = localStorage.getItem('currentDivision');
    if (division) {
      setCurrDivision(division);
    }
  });

  // Fetching warehouse names from the server
  const getDivisionList = async () => {
    try {
      const response = await WMKBackend.get('/divisions');
      setDivisionList(response.data);
    } catch (err) {
      // eslint-disable-next-line
      console.error(err);
    }
  };

  useEffect(async () => {
    setLoading(true);
    getDivisionList();
    setLoading(false);
  }, []);

  // Creating dropdown selector for division menu
  const Menu = () => (
    <select
      name="division"
      className="division-dropdown"
      value={currDivision}
      onChange={(e) => {
        setCurrDivision(parseInt(e.target.value, 10));
        localStorage.setItem('currentDivision', parseInt(e.target.value, 10));
      }}
    >
      {Object.entries(divisionList)
        .sort((a, b) => (a.id > b.id ? 1 : -1))
        .map(([id, division]) => (
          <option key={id} value={division.id}>{division.div_name}</option>
        ))}
    </select>
  );

  if (isLoading) {
    return (<div>Loading dashboard...</div>);
  }

  return (
    <div className="admin-dashboard">
      <div className="division-section">
        { Menu() }
      </div>
      <div className="admin-components-container">
        <div className="inventory-section">
          <TitledCard title="Inventory">
            <AdminInventoryPreview division={currDivision} />
          </TitledCard>
        </div>
        <div className="upcoming-events-container">
          <TitledCard title="Events">
            <AdminEventsPreview />
          </TitledCard>
        </div>
      </div>
      <div className="availability-section">
        <AdminAvailability />
      </div>
    </div>
  );
};

export default withCookies(AdminDashboard);
