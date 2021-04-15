import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { WMKBackend } from '../../../../common/utils';

const useRejectedHours = () => {
  const [rejectedHours, setRejectedHours] = useState([]);
  const [cookies] = useCookies(['userId']);

  const fetchRejectedHours = () => WMKBackend.get('/logs/rejected', {
    params: { userId: cookies.userId },
    withCredentials: true,
  }).then((res) => {
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
