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
import UserDirectory from './pages/UserDirectory/userDirectory';
import VerificationPage from './pages/login/verificationPage';
import InventoryPage from './pages/inventory/inventoryPage';
import VolunteerEvents from './pages/volunteer-events/volunteerEvents';
import VolunteerHoursPage from './pages/VolunteerHours/VolunteerHoursPage';
import EventDetailPage from './pages/EventDataPage/EventDataPage';
import NotFound404 from './pages/NotFound404/NotFound404';
import InternalServerError from './pages/InternalServerError/InternalServerError';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Layout from './components/layout/layout';
import Profile from './pages/profile/profile';
import Events from './components/events/events';
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
              <Route path="/500" component={InternalServerError} />
              <div className="App">
                <Layout>
                  <Switch>
                    <Route path="/sandbox" component={Test} />
                    <ProtectedRoute path="/" component={Dashboard} exact />
                    <ProtectedRoute path="/profile" component={Profile} />
                    <ProtectedRoute path="/volunteer/events" component={VolunteerEvents} />
                    <ProtectedRoute path="/volunteer/hours" component={VolunteerHoursPage} />

                    <ProtectedRoute path="/admin/events" component={Events} admin />
                    <ProtectedRoute path="/admin/users" component={UserDirectory} admin />
                    <ProtectedRoute path="/admin/event/:id" component={EventDetailPage} admin />
                    <ProtectedRoute path="/admin/inventory" component={InventoryPage} admin />
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
