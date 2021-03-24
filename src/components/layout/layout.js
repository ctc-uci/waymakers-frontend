import React from 'react';

import Header from '../header/header';
import Footer from '../footer/footer';

import './layout.css';

const Layout = () => (
  <div className="layout">
    <Header />
    <p>Content</p>
    <Footer />
  </div>
);

export default Layout;
