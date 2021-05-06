import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import useMobileWidth from '../../../common/useMobileWidth';
import { WMKBackend } from '../../../common/utils';

import './AdminInventoryPreview.css';

const AdminInventoryPreview = ({ division }) => {
  const [topItems, setTopItems] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);
  const [warehouseIndex, setWarehouseIndex] = useState(0);
  const [warehouseIDMap, setWarehouseIDMap] = useState({});
  const [warehouseName, setWarehouseName] = useState('');

  const isMobile = useMobileWidth(1100);
  const topAmount = isMobile ? 2 : 3;
  const history = useHistory();

  // Fetching top items from the server

  const getTopItems = async () => {
    try {
      const response = await WMKBackend.get(`/inventory/top?warehouse=${warehouseIDMap[warehouseName]}&numItems=${topAmount}`);
      setTopItems(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const itemDisplay = (item, index) => (
    <div className="top-item" key={index}>
      <p className="top-item-name medium">
        {item.name}
      </p>
      <div className="in-stock">
        <p className="medium">In Stock</p>
        {' '}
        <p className="in-stock-quantity medium">{item.quantity}</p>
      </div>
      <div className="needed">
        <p className="medium">Needed</p>
        {' '}
        <p className="needed-quantity medium">{item.needed}</p>
      </div>
    </div>
  );

  // Fetching warehouse names from the server
  const getWarehouseList = async () => {
    try {
      const response = await WMKBackend.get(`/warehouses?division=${division}`);
      setWarehouseList(response.data);

      const warehouseMap = {};
      response.data.forEach((warehouse) => {
        warehouseMap[warehouse.warehouse_name] = warehouse.id;
      });

      setWarehouseIDMap(warehouseMap);
    } catch (err) {
      // eslint-disable-next-line
      console.error(err);
    }
  };

  // Creating dropdown selector for warehouse menu
  const Menu = () => (
    <div className="warehouse-section">
      <select
        name="warehouses"
        className="warehouse-dropdown"
        value={warehouseIndex - 1}
        onChange={(e) => {
          setWarehouseIndex(parseInt(e.target.value, 10) + 1);
          setWarehouseName(warehouseList[parseInt(e.target.value, 10)].warehouse_name);
        }}
      >
        {Object.entries(warehouseList)
          .map(([id, warehouse]) => (
            <option key={id} value={id}>{warehouse.warehouse_name}</option>
          ))}
      </select>
    </div>
  );

  // Get warehouses when division is updated
  useEffect(() => {
    getWarehouseList();
  }, [division]);

  // Get default warehouse when warehouse list is loaded
  useEffect(() => {
    if (warehouseList[0]) {
      setWarehouseName(warehouseList[0].warehouse_name);
      setWarehouseIndex(0);
    }
  }, [warehouseList]);

  // Get top items when warehouse is selected
  useEffect(() => {
    if (warehouseName) {
      getTopItems();
    }
  }, [warehouseName, isMobile]);

  const renderInfo = () => {
    if (warehouseList.length === 0) {
      return (
        <div className="no-items-message"> No warehouses in this division :( </div>
      );
    }
    if (topItems.length === 0) {
      return (<div className="no-items-message"> No items in this warehouse :( </div>);
    }
    return (
      <div className="top-items-section">
        {topItems.map((item, index) => (
          itemDisplay(item, index)
        ))}
      </div>
    );
  };

  return (
    <div className="inventory-component">
      { warehouseList.length > 0 && Menu() }
      {renderInfo()}
      <div className="view-inventory-section">
        <button type="button" className="all-events-button button-anchor" onClick={() => history.push('/admin/inventory')}>
          <p className="large">View All</p>
        </button>
      </div>
    </div>
  );
};

AdminInventoryPreview.propTypes = {
  division: PropTypes.number.isRequired,
};

export default AdminInventoryPreview;
