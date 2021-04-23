import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './volunteerTableRow.css';

const VolunteerTableRow = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <tr className="table-header" onClick={() => { setIsOpen((prev) => !prev); }}>
        <td>
          <div className="profile-pic" />
        </td>
        <td className="name">
          {data.firstname}
          {' '}
          {data.lastname}
        </td>
        <td className="header-data">{data.sum}</td>
        <td>
          {/* TODO: add a better icon lmao */}
          {isOpen ? '^' : 'v'}
        </td>
      </tr>
      {isOpen
        ? (
          <tr className="row">
            {/* TODO: style when high-fidelity is out */}
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
