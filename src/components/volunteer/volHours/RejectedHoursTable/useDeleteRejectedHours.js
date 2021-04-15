import { useCookies } from 'react-cookie';

import { WMKBackend } from '../../../../common/utils';

// Note: returns a callback
const useRejectedHours = () => {
  const [cookies] = useCookies(['userId']);

  const deleteRejectedHours = (logId) => WMKBackend.post('/logs/removeRejected',
    { logId },
    {
      params: { userId: cookies.userId },
    });

  return [deleteRejectedHours];
};

export default useRejectedHours;
