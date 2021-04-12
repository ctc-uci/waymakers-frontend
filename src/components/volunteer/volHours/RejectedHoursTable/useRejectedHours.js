import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const useRejectedHours = () => {
  const [rejectedHours, setRejectedHours] = useState([]);
  const [cookies] = useCookies(['userId']);

  const fetchRejectedHours = () => axios.get(
    `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/logs/rejected`, {
      params: { userId: cookies.userId },
      withCredentials: true,
    },
  ).then((res) => {
    setRejectedHours(res.data);
  }).catch((err) => {
    console.error(err);
  });

  useEffect(() => {
    fetchRejectedHours();
  }, []);

  return [rejectedHours, fetchRejectedHours];
};

export default useRejectedHours;
