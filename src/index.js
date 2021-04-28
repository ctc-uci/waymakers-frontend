import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';

import './common/ConfigLoader';
import Test from './.harrison-sandbox/Test';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Layout from './components/layout/layout';
import Dashboard from './pages/dashboard/dashboard';
import RegisterPage from './pages/login/registerPage';
import LoginPage from './pages/login/loginPage';
import VerificationPage from './pages/login/verificationPage';
import ManageUsers from './components/admin/manageusers/manageusers';
import ManageDB from './components/admin/managedb/managedb';
import Profile from './pages/profile/profile';
import Hours from './components/volunteer/volHours/hours';
import Tier from './components/volunteer/tier/tier';
import Forms from './components/volunteer/forms/forms';
import Inventory from './components/inventory/inventory';
import Reports from './components/reports/reports';
import Events from './components/events/events';
import VolunteerEventAggregatePage from './components/admin/volunteer-event-aggregate-page/volunteerEventAggregatePage';
import EventDetailPage from './components/admin/volunteer-event-aggregate-page/event-data-page/eventPage';
import viewHours from './components/events/view-hours/viewHours';
import VolunteerEvents from './pages/volunteer-events/volunteerEvents';
import NotFound404 from './pages/NotFound404';
import store from './redux/store';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/verification" component={VerificationPage} />
            <Layout>
              <div className="App">
                <Switch>
                  <Route path="/sandbox" component={Test} />
                  <ProtectedRoute path="/" component={Dashboard} exact />
                  <ProtectedRoute path="/profile" component={Profile} />
                  <ProtectedRoute path="/admin/users" component={ManageUsers} admin />
                  <ProtectedRoute path="/admin/db" component={ManageDB} admin />
                  <ProtectedRoute path="/admin/aggregate" component={VolunteerEventAggregatePage} admin />
                  <ProtectedRoute path="/admin/event/:id" component={EventDetailPage} admin />
                  <ProtectedRoute path="/admin/viewEvent" component={EventDetailPage} admin />
                  <ProtectedRoute path="/volunteer/events" component={VolunteerEvents} />
                  <ProtectedRoute path="/volunteer/hours" component={Hours} />
                  <ProtectedRoute path="/volunteer/tier" component={Tier} />
                  <ProtectedRoute path="/volunteer/forms" component={Forms} />
                  <ProtectedRoute path="/inventory" component={Inventory} admin />
                  <ProtectedRoute path="/reports" component={Reports} admin />
                  <ProtectedRoute path="/events/viewHours" component={viewHours} />
                  <ProtectedRoute path="/events" component={Events} admin />
                  <Route path="*" component={NotFound404} />
                </Switch>
              </div>
            </Layout>
          </Switch>
        </Router>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
  /* eslint-disable no-undef */
  document.getElementById('root'),
);
