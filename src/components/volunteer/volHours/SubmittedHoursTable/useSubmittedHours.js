import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { WMKBackend } from '../../../../common/utils';

const useAllSubmittedHours = () => {
  // NOT subject to change based on filtering
  const [allSubmittedHours, setAllSubmittedHours] = useState(null);

  const [cookies] = useCookies(['userId']);

  const fetchAllSubmittedHours = () => WMKBackend.get('/logs/submitted', {
    params: { userId: cookies.userId },
    withCredentials: true,
  }).then((res) => {
    setAllSubmittedHours(res.data);
  }).catch((err) => {
    console.error(err);
  });

  useEffect(() => {
    fetchAllSubmittedHours();
  }, []);

  return [allSubmittedHours, fetchAllSubmittedHours];
};

export default useAllSubmittedHours;
