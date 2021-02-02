import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import ProtectedRoute from './routes/ProtectedRoute';
import Layout from './components/layout/layout';
import Dashboard from './components/dashboard/dashboard';
import Register from './components/register/register';
import LogIn from './components/login/login';
import ManageUsers from './components/admin/manageusers/manageusers';
import ManageDB from './components/admin/managedb/managedb';
// import Profile from './components/profile/profile';
import viewProfile from './templates/viewProfile';
import editProfile from './templates/editProfile';
import Hours from './components/volunteer/volHours/hours';
import Tier from './components/volunteer/tier/tier';
import Forms from './components/volunteer/forms/forms';
import Inventory from './components/inventory/inventory';
import Reports from './components/reports/reports';
import Events from './components/events/events';
import viewHours from './components/events/view-hours/viewHours';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Layout />
    <CookiesProvider>
      <Router>
        <div className="App">
          <div className="container">
            <Switch>
              <ProtectedRoute path="/" component={Dashboard} exact />
              <Route path="/register" component={Register} />
              <Route path="/login" component={LogIn} />
              {/* <ProtectedRoute path="/profile" component={Profile} /> */}
              <ProtectedRoute path="/profile" component={viewProfile} />
              <ProtectedRoute path="/editProfile" component={editProfile} />
            </Switch>

            <Switch>
              <ProtectedRoute path="/admin/users" component={ManageUsers} />
              <ProtectedRoute path="/admin/db" component={ManageDB} />
            </Switch>

            <Switch>
              <ProtectedRoute path="/volunteer/hours" component={Hours} />
              <ProtectedRoute path="/volunteer/tier" component={Tier} />
              <ProtectedRoute path="/volunteer/forms" component={Forms} />
            </Switch>

            <Switch>
              <ProtectedRoute path="/inventory" component={Inventory} />
              <ProtectedRoute path="/reports" component={Reports} />
              <ProtectedRoute path="/events" component={Events} />
              <ProtectedRoute path="/viewHours" component={viewHours} />
            </Switch>
          </div>
        </div>
      </Router>
    </CookiesProvider>

  </React.StrictMode>,
  /* eslint-disable no-undef */
  document.getElementById('root'),
);
