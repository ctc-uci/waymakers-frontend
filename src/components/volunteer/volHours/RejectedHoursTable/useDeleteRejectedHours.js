import axios from 'axios';
import { useCookies } from 'react-cookie';

// Note: returns a callback
const useRejectedHours = () => {
  const [cookies] = useCookies(['userId']);

  const deleteRejectedHours = (logId) => axios.post(
    `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/logs/removeRejected`,
    { logId },
    {
      params: { userId: cookies.userId },
      withCredentials: true,
    },
  );

  return [deleteRejectedHours];
};

export default useRejectedHours;
