import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { WMKBackend } from '../../../common/utils';

const useUserEvents = () => {
  const [userEvents, setUserEvents] = useState([]);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(['userId']);

  const fetchUserEvents = () => {
    WMKBackend.get(`/userEvent/${cookies.userId}`)
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
