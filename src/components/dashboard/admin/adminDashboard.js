import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card, Button, Alert,
} from 'react-bootstrap';
import {
  startOfWeek, add, getHours, getDay,
} from 'date-fns';
import axios from 'axios';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import EditEvents from '../../events/edit-events/editEvents';
import InventoryComponent from '../inventory-component/inventoryComponent';
import auth from '../../firebase/firebase';
import './adminDashboard.css';

import ViewAvailability from '../availability-component/viewAvailability/viewAvailability';
import EditAvailability from '../availability-component/editAvailability/editAvailability';
import AdminAvailability from '../availability-component/adminAvailability/adminAvailability';

import Header from '../../header/header';
import Footer from '../../footer/footer';

const AdminDashboard = (props) => {
  const startWeek = startOfWeek(new Date());

  const { cookies } = props;
  const history = useHistory();
  const [availability, setAvailability] = useState([]);
  const [allAvailability, setAllAvailability] = useState([]);
  const [freqMap, setfreqMap] = useState(new Map());
  const [nameMap, setNameMap] = useState(new Map());
  const [availabilityMode, setAvailabilityMode] = useState('view');
  const [error, setError] = useState('');
  // eslint-disable-next-line
    const [isLoading, setLoading] = useState(false);

  async function logout() {
    try {
      await auth.signOut();
      history.push('/login');
      // Removing session cookie
      cookies.remove('accessToken');
      cookies.remove('userId');
      // Sign-out successful
    } catch (err) {
      setError(err.message);
    }
  }

  const stringToDate = (dateString) => {
    const {
      dayofweek, starttime,
    } = dateString;

    const splitTime = String(starttime).split(':');
    const date = add(startWeek, {
      years: 0,
      months: 0,
      weeks: 0,
      days: dayofweek,
      hours: splitTime[0],
      minutes: 0,
      seconds: 0,
    });

    return date;
  };

  const parseDate = (date) => {
    const hours = getHours(date);
    return [getDay(date), `${hours}:00:00`];
  };

  async function getAvailability() {
    try {
      console.log('getting availability');
      const userID = cookies.get('userId');

      const availabilityResult = await axios.get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/availability/${userID}`, {
          withCredentials: true,
        },
      );

      const allAvailabilityResult = await axios.get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/availability/counts`, {
          withCredentials: true,
        },
      );

      const availabilityNamesResult = await axios.get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/availability/names`, {
          withCredentials: true,
        },
      );

      // handling one user's availability
      const { userAvailability } = availabilityResult.data;
      // console.log('userAvailability', userAvailability);
      const dateList = userAvailability.map((dateString) => (stringToDate(dateString)));
      setAvailability(dateList);

      // handling all users' availability
      let { usersAvailability } = allAvailabilityResult.data;
      // console.log('usersAvailability', usersAvailability);

      const frequencyMap = new Map();

      usersAvailability = usersAvailability.map((dateString) => {
        const {
          dayofweek, starttime, count,
        } = dateString;

        const parsedDate = stringToDate({ dayofweek, starttime });
        frequencyMap.set(JSON.stringify(parsedDate), Number(count));

        return {
          date: parsedDate,
          freq: Number(count),
        };
      });

      setAllAvailability(usersAvailability);
      // console.log('frequencyMap', frequencyMap);
      setfreqMap(frequencyMap);

      let { availabilityNames } = availabilityNamesResult.data;
      console.log('availabilityNames', availabilityNames);
      // console.log('usersAvailability', usersAvailability);
      const namesMap = new Map();

      availabilityNames = availabilityNames.map((dateString) => {
        const {
          dayofweek, starttime, firstname, lastname, locationcity, phone, email,
        } = dateString;

        const parsedDate = stringToDate({ dayofweek, starttime });

        const dateValue = namesMap.get(JSON.stringify(parsedDate));

        if (dateValue === undefined) {
          namesMap.set(JSON.stringify(parsedDate), [
            {
              fname: firstname, lname: lastname, city: locationcity, phone, email,
            },
          ]);
        } else {
          dateValue.push({
            fname: firstname, lname: lastname, city: locationcity, phone, email,
          });
          namesMap.set(JSON.stringify(parsedDate), dateValue);
        }

        return {
          date: parsedDate,
          name: String(`${firstname} ${lastname}`),
        };
      });

      setAllAvailability(usersAvailability);
      // console.log('frequencyMap', frequencyMap);
      setNameMap(namesMap);
      console.log(namesMap);
    } catch (e) {
      // eslint-disable-next-line
      console.log('Error:', e);
      console.log('Error while getting availability from the backend!');
    }
  }

  async function updateAvailability() {
    const dateList = availability.map((date) => (parseDate(date)));
    console.log('about to post dateList to POST route');
    const seen = new Set();

    const filteredDates = dateList.filter((date) => {
      const duplicate = seen.has(date.toString());
      seen.add(date.toString());
      return !duplicate;
    });

    const userID = cookies.get('userId');

    console.log('dateList to POST:', filteredDates);

    console.log('POST route called');

    await axios.post(
      `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/availability/${userID}`, {
        dates: filteredDates,
      }, {
        withCredentials: true,
      },
    );

    console.log('post complete');

    setAvailabilityMode('view');
  }

  function renderAvailability() {
    // console.log(availabilityViewMode);
    // console.log(`rendering availability in ${availabilityMode} mode`);
    // console.log('availability:', availability);

    console.log('allAvailability', allAvailability);
    console.log('freqMap state', freqMap);
    return (
      <div>
        {availabilityMode === 'view' ? (
          <div className="availability-wrapper">
            <h5 className="availability-title">Availability for the Week</h5>
            <div className="availability-buttons-container">
              <div
                className="edit-button"
                onClick={() => { setAvailabilityMode('edit'); }}
                onKeyDown={() => { setAvailabilityMode('edit'); }}
                role="button"
                tabIndex={0}
              >
                Change Availability
              </div>
              <div className="help-popup">?</div>
            </div>
            <ViewAvailability availabilities={availability} startWeek={startWeek} />
            {/* <ViewAvailability
              availabilities={availability}
              startWeek={startWeek}
              showAdmin
              allAvailability={allAvailability}
              freqMap={freqMap}
              maxFreq={Math.max(...allAvailability.map((el) => el.freq), 0)}
            /> */}
            <AdminAvailability
              startWeek={startWeek}
              allAvailability={allAvailability}
              freqMap={freqMap}
              maxFreq={Math.max(...allAvailability.map((el) => el.freq), 0)}
              nameMap={nameMap}
            />
          </div>
        )
          : (
            <div className="availability-wrapper">
              <h5 className="availability-title">Availability for the Week</h5>
              <div
                className="save-button"
                onClick={updateAvailability}
                onKeyDown={updateAvailability}
                role="button"
                tabIndex={0}
              >
                Save Changes
              </div>
              <EditAvailability
                availabilityTimes={availability}
                setAvailabilityTimes={setAvailability}
                startWeek={startWeek}
              />
            </div>
          )}
      </div>
    );
  }

  useEffect(async () => {
    setLoading(true);
    getAvailability();
    setLoading(false);
  }, []);

  return (
    <div>
      <Header />

      <div className="d-flex align-items-center justify-content-center">
        <div className="w-100 login-container">
          <Card className="w-100">
            <Card.Body>
              <h2 className="text-center mb-4">Admin Dashboard</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Button onClick={logout} to="/login" className="w-100" type="submit" variant="primary">Log Out</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="admin-components">
        <div className="division-selector">
          <h2 className="division-selector-title">Crisis Response Team</h2>
        </div>
        <div className="admin-components-container">
          <div className="inventory-events-section">
            <div className="inventory-section">
              <h5 className="component-title">Inventory</h5>
              <InventoryComponent />
            </div>
            <div className="upcoming-events-section">
              <h5 className="component-title">Events</h5>
              <EditEvents />
            </div>
          </div>
          <div className="analytics-section">
            <h5 className="component-title">Analytics</h5>
            <div className="analytics-component" />
          </div>
        </div>
        <div className="availability-section">
          {renderAvailability()}
        </div>
      </div>

      <Footer />
    </div>
  );
};

AdminDashboard.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(AdminDashboard);
