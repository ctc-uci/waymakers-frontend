import React from 'react';
import PropTypes from 'prop-types';

import Header from '../header/header';
import AlertBanner from '../../common/AlertBanner/AlertBanner';
import Footer from '../footer/footer';

import './layout.css';

const Layout = ({ children }) => (
  <>
    <Header />
    <AlertBanner />
    <div className="layout">
      {children}
    </div>
    <Footer />
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
