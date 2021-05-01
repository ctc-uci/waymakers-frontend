import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './volunteerTableRow.css';
import toggleOpen from '../../../../../assets/datatoggleopen.svg';
import toggleClose from '../../../../../assets/datatoggleclose.svg';

const VolunteerTableRow = ({ data, profilePicture }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <tr className="table-header" onClick={() => { setIsOpen((prev) => !prev); }}>
        <td>
          <img src={profilePicture || 'https://placehold.it/75x75'} alt="Profile Pic" className="prof-pic" />
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
  profilePicture: PropTypes.node.isRequired,
};
export default VolunteerTableRow;
