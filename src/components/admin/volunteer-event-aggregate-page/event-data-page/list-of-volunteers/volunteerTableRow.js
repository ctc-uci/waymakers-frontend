import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ProfilePlaceholder from '../../../../../assets/profileplaceholder.jpg';
import toggleOpen from '../../../../../assets/datatoggleopen.svg';
import toggleClose from '../../../../../assets/datatoggleclose.svg';

import './volunteerTableRow.css';

const VolunteerTableRow = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <tr className="table-header" onClick={() => { setIsOpen((prev) => !prev); }}>
        <td>
          <img src={data.profile_picture || ProfilePlaceholder} alt="Profile Pic" className="prof-pic" />
        </td>
        <td className="name">
          {data.firstname}
          {' '}
          {data.lastname}
        </td>
        <td className="header-data">{data.sum}</td>
        <td>
          <img alt="" src={isOpen ? toggleClose : toggleOpen} />
        </td>
      </tr>
      {isOpen
        ? (
          <tr className="row">
            <td className="col-data" colSpan="2">
              <span className="bold">Position:  </span>
              {' '}
              {data.permissions}
              <br />
              <span className="bold">Volunteer Tier:  </span>
              {' '}
              {data.tier}
              <br />
              <span className="bold">Birthday:  </span>
              {' '}
              {data.birthdate}
              <br />
            </td>
            <td className="col-data" colSpan="2">
              <span className="bold">Gender:  </span>
              {' '}
              {data.gender}
              <br />
              <span className="bold">Email:  </span>
              {' '}
              {data.email}
              <br />
              <span className="bold">Phone:  </span>
              {' '}
              {data.phone}
            </td>
          </tr>
        ) : <tr />}
    </>
  );
};

VolunteerTableRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};
export default VolunteerTableRow;
