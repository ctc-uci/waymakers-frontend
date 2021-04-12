import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const useAllApprovedHours = () => {
  // NOT subject to change based on filtering
  const [allApprovedHours, setAllApprovedHours] = useState(null);

  const [cookies] = useCookies(['userId']);

  const fetchAllApprovedHours = () => axios.get(
    `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/logs/approved`, {
      params: { userId: cookies.userId },
      withCredentials: true,
    },
  ).then((res) => {
    setAllApprovedHours(res.data);
  }).catch((err) => {
    console.error(err);
  });

  useEffect(() => {
    fetchAllApprovedHours();
  }, []);

  return [allApprovedHours, fetchAllApprovedHours];
};

export default useAllApprovedHours;
