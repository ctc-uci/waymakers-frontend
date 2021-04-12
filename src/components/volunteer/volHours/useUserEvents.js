import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
  withCredentials: true,
});

const useUserEvents = () => {
  const [userEvents, setUserEvents] = useState([]);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(['userId']);

  const fetchUserEvents = () => {
    instance.get(`userEvent/${cookies.userId}`)
      .then((result) => setUserEvents(result.data))
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  };

  useEffect(() => {
    fetchUserEvents();
  }, []);

  return [userEvents, fetchUserEvents, error];
};

export default useUserEvents;
