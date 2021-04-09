import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const useApprovedHours = () => {
  const [approvedHours, setApprovedHours] = useState(null);
  const [cookies] = useCookies(['userId']);

  const fetchApprovedHours = () => axios.get(
    `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/logs/approved`, {
      params: { userId: cookies.userId },
      withCredentials: true,
    },
  ).then((res) => {
    setApprovedHours(res.data);
  }).catch((err) => {
    console.log(err);
  });

  useEffect(() => {
    fetchApprovedHours();
  }, []);

  return [approvedHours, fetchApprovedHours];
};

export default useApprovedHours;
