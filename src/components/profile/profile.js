/* eslint-disable import/no-cycle */
import React from 'react';
import './profile.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import viewProfile from '../../pages/viewProfile';
import editProfile from '../../pages/editProfile';

function Profile() {
  return (
    <Router>
      <div className="App">
        <div className="page-container">
          {/* <viewProfile /> */}
          <Switch>
            <Route path="/profile" exact component={viewProfile} />
            <Route path="/editProfile" exact component={editProfile} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default Profile;
