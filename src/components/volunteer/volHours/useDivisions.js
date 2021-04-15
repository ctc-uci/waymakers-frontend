import { useEffect, useState } from 'react';

import { WMKBackend } from '../../../common/utils';

const useDivisions = () => {
  const [divisions, setDivisions] = useState([]);
  const [error, setError] = useState(null);

  const fetchDivisions = () => {
    WMKBackend.get('/divisions')
      .then((result) => setDivisions(result.data))
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  };

  useEffect(() => {
    fetchDivisions();
  }, []);

  return [divisions, fetchDivisions, error];
};

export default useDivisions;
