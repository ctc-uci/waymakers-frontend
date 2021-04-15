import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { WMKBackend } from '../../../../common/utils';

const useAllApprovedHours = () => {
  // NOT subject to change based on filtering
  const [allApprovedHours, setAllApprovedHours] = useState(null);

  const [cookies] = useCookies(['userId']);

  const fetchAllApprovedHours = () => WMKBackend.get('/logs/approved', {
    params: { userId: cookies.userId },
    withCredentials: true,
  }).then((res) => {
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
