import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { Helmet } from 'react-helmet';

import { WMKBackend } from '../../common/utils';

import EventDetails from '../../components/admin/volunteer-event-aggregate-page/event-data-page/event-details/EventDetails';
import TopVolunteers from '../../components/admin/volunteer-event-aggregate-page/event-data-page/top-volunteers/topVolunteers';
import ListOfVolunteers from '../../components/admin/volunteer-event-aggregate-page/event-data-page/list-of-volunteers/listOfVolunteers';
import Demographics from '../../components/admin/volunteer-event-aggregate-page/event-data-page/demographics/demographics';

import './EventDataPage.css';

const EventDetailPage = () => {
  const { id: eventId } = useParams();
  const [eventName, setEventName] = useState([]);
  const history = useHistory();

  const getEventInfo = async () => {
    try {
      const currentEvent = await WMKBackend.get(`/events/${eventId}`);
      setEventName(currentEvent.data[0].title);
    } catch (err) {
      console.log(err.message);
      if (err.response.status === 400) {
        history.push('/404');
      } else {
        history.push('/500');
      }
    }
  };

  useEffect(() => {
    getEventInfo();
  }, []);

  return (
    <div className="event-page-info">
      <Helmet>
        <title>Waymakers | Event Data Page</title>
      </Helmet>
      <h1 className="event-title">{eventName}</h1>
      <div className="row1">
        <EventDetails eventId={eventId} />
        <Demographics eventId={eventId} />
      </div>
      <div className="row2">
        <TopVolunteers eventId={eventId} className="top-volunteers" />
        <ListOfVolunteers eventId={eventId} className="all-volunteers" />
      </div>
    </div>
  );
};

export default withCookies(EventDetailPage);
