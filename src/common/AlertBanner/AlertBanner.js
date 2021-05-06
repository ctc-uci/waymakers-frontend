import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './AlertBanner.css';

import { Alert } from '@material-ui/lab';

const AlertBanner = () => {
  const { alerts } = useSelector((state) => state.notifications);
  const [alert, setAlert] = useState({ theme: '', message: '' });
  const [showBanner, setShowBanner] = useState(false);

  const closeBanner = () => {
    setShowBanner(false);
  };

  // TODO: clear array after the timeout
  useEffect(() => {
    console.log(alerts);
    if (alerts.length > 0) {
      setAlert(alerts[alerts.length - 1]);
      setShowBanner(true);
      setTimeout(() => {
        closeBanner();
      }, 5000);
    }
  }, [alerts]);

  return (
    <Alert
      className={`alert-banner ${showBanner ? 'alert-banner-visible' : 'alert-banner-invisible'}`}
      severity={alert.severity}
      variant="filled"
      onClose={closeBanner}
    >
      {alert.message}
    </Alert>
  );
};

export default AlertBanner;
