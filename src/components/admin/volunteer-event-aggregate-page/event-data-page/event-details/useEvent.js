import { useState, useEffect } from 'react';
import { WMKBackend } from '../../../../../common/utils';

const useEvent = (eventId) => {
  const [event, setEvent] = useState(null);
  const [isInitializing, setIsIntializing] = useState(true);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const fetchEvent = (_eventId) => {
    setIsLoading(true);
    WMKBackend.get(`/events/${_eventId}`)
      .then((res) => {
        setEvent(res.data[0]);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
        setIsIntializing(false);
      });
  };

  useEffect(() => {
    fetchEvent(eventId);
  }, []);

  return [event, {
    isInitializing, isLoading, error, fetchEvent,
  }];
};

export default useEvent;
