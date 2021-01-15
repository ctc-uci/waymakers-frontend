import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from './components/layout/layout';
import Dashboard from './components/dashboard/dashboard';
import Register from './components/register/register';
import LogIn from './components/login/login';
import ManageUsers from './components/admin/manageusers/manageusers';
import ManageDB from './components/admin/managedb/managedb';
import Profile from './components/profile/profile';
import Hours from './components/volunteer/volHours/hours';
import Tier from './components/volunteer/tier/tier';
import Forms from './components/volunteer/forms/forms';
import Inventory from './components/inventory/inventory';
import Reports from './components/reports/reports';
import Events from './components/events/events';
import ViewHours from './components/events/view-hours/viewHours';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Layout />
    <Router>
      <div className="App">
        <div className="container">
          <Switch>
            <Route path="/" component={Dashboard} exact />
            <Route path="/register" component={Register} />
            <Route path="/login" component={LogIn} />
            <Route path="/profile" component={Profile} />
          </Switch>

          <Switch>
            <Route path="/admin/users" component={ManageUsers} />
            <Route path="/admin/db" component={ManageDB} />
          </Switch>

          <Switch>
            <Route path="/volunteer/hours" component={Hours} />
            <Route path="/volunteer/tier" component={Tier} />
            <Route path="/volunteer/forms" component={Forms} />
          </Switch>

          <Switch>
            <Route path="/inventory" component={Inventory} />
            <Route path="/reports" component={Reports} />
            <Route path="/events" component={Events} />
            <Route path="/viewhours" component={ViewHours} />
          </Switch>
        </div>
      </div>
    </Router>

  </React.StrictMode>,
  /* eslint-disable no-undef */
  document.getElementById('root'),
);
