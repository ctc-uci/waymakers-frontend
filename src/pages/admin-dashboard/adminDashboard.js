import React from 'react';
import EditEvents from '../../components/events/edit-events/editEvents';
import InventoryComponent from '../../components/dashboard/inventory-component/inventoryComponent';
import './adminDashboard.css';

const AdminDashboard = () => (
  <div>
    <div id="admin-dashboard-container">
      <div id="inventory-events-container">
        <InventoryComponent />
        <br />
        <EditEvents />
      </div>
      <div id="analytics-container">
        <h3>Analytics</h3>
        <div id="analytics-content">
          Content
        </div>
      </div>
    </div>
    <br />
    <div>
      <h3>Volunteer On-Call Availability</h3>
    </div>
  </div>

);

export default AdminDashboard;
