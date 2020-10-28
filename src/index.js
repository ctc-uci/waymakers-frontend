import React from 'react';
import ReactDOM from 'react-dom';

// import Header from './components/header/header';
// import Footer from './components/footer/footer';
import Layout from './components/layout/layout';
// import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Header />
    <Footer /> */}
    <Layout />
  </React.StrictMode>,
  /* eslint-disable no-undef */
  document.getElementById('root'),
);
