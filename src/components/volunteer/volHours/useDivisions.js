import { useEffect, useState } from 'react';
import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
  withCredentials: true,
});

const useDivisions = () => {
  const [divisions, setDivisions] = useState([]);
  const [error, setError] = useState(null);

  const fetchDivisions = () => {
    instance.get('divisions')
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
