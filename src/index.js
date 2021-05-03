import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';

import './common/ConfigLoader';

import Test from './.harrison-sandbox/Test';

import Dashboard from './pages/dashboard/dashboard';
import RegisterPage from './pages/login/registerPage';
import LoginPage from './pages/login/loginPage';
import UserDirectory from './components/admin/user-directory/userDirectory';
import VerificationPage from './pages/login/verificationPage';
import InventoryPage from './pages/inventory/inventoryPage';
import VolunteerEvents from './pages/volunteer-events/volunteerEvents';
import VolunteerHoursPage from './pages/VolunteerHours/VolunteerHoursPage';
import EventDetailPage from './pages/EventDataPage/EventDataPage';
import NotFound404 from './pages/NotFound404/NotFound404';
import InternalServerError from './pages/InternalServerError/InternalServerError';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Layout from './components/layout/layout';
import ManageDB from './components/admin/managedb/managedb';
import Profile from './pages/profile/profile';
import Tier from './components/volunteer/tier/tier';
import Forms from './components/volunteer/forms/forms';
import Reports from './components/reports/reports';
import Events from './components/events/events';
import viewHours from './components/events/view-hours/viewHours';
// DEPRECATED
// import VolunteerEventAggregatePage from './components/admin/...whatever';

import store from './redux/store';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <ErrorBoundary
          FallbackComponent={InternalServerError}
          onError={(error, info) => {
            console.log('@InternalServerError 500:', error, info);
          }}
        >
          <Router>
            <Switch>
              <Route path="/register" component={RegisterPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/verification" component={VerificationPage} />
              <Route path="/internalservererror" component={InternalServerError} />
              <div className="App">
                <Layout>
                  <Switch>
                    <Route path="/sandbox" component={Test} />
                    <ProtectedRoute path="/" component={Dashboard} exact />
                    <ProtectedRoute path="/profile" component={Profile} />
                    <ProtectedRoute path="/admin/users" component={UserDirectory} admin />
                    <ProtectedRoute path="/admin/db" component={ManageDB} admin />
                    <ProtectedRoute path="/admin/event/:id" component={EventDetailPage} admin />
                    <ProtectedRoute path="/volunteer/events" component={VolunteerEvents} />
                    <ProtectedRoute path="/volunteer/hours" component={VolunteerHoursPage} />
                    <ProtectedRoute path="/volunteer/tier" component={Tier} />
                    <ProtectedRoute path="/volunteer/forms" component={Forms} />
                    <ProtectedRoute path="/inventory" component={InventoryPage} admin />
                    <ProtectedRoute path="/reports" component={Reports} admin />
                    <ProtectedRoute path="/events/viewHours" component={viewHours} />
                    <ProtectedRoute path="/events" component={Events} admin />
                    <Route path="*" component={NotFound404} />
                  </Switch>
                </Layout>
              </div>
            </Switch>
          </Router>
        </ErrorBoundary>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
  /* eslint-disable no-undef */
  document.getElementById('root'),
);
