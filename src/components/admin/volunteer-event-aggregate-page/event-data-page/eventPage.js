import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import EventDetails from './event-details/EventDetails';
import TopVolunteersComponent from './top-volunteers/topVolunteersComponent';
import ListOfVolunteers from './list-of-volunteers/listOfVolunteers';
import Demographics from './demographics/demographics';

import { WMKBackend } from '../../../../common/utils';

import './eventPage.css';

const EventDetailPage = ({ cookies }) => {
  const event = useParams();
  const [eventName, setEventName] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);

  const getEventInfo = async () => {
    const currentEvent = await WMKBackend.get(`/events/${event.id}`);
    setEventName(currentEvent.data[0].title);
  };

  const getProfilePicture = async () => {
    const userID = cookies.get('userId');
    const result = await WMKBackend.get(`/accounts/${userID}`);

    const { account } = result.data;
    setProfilePicture(account.profile_picture);
  };

  useEffect(() => {
    getEventInfo();
    getProfilePicture();
  }, []);
  // TODO: Remove borders and add box shadows before we're done
  // (they're commented out to help with alignment)
  return (
    <div className="event-page-info">
      <h1 className="event-title">{eventName}</h1>
      <div className="row1">
        <EventDetails event={event} />
        {/* <div className="demo"> */}
        <Demographics event={event} />
        {/* </div> */}
      </div>
      <div className="row2">
        <TopVolunteersComponent event={event} profilePicture={profilePicture} className="top-volunteers" />
        <ListOfVolunteers event={event} profilePicture={profilePicture} className="all-volunteers" />
      </div>
    </div>
  );
};

EventDetailPage.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(EventDetailPage);
