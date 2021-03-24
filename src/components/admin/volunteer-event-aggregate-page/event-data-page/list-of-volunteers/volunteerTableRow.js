import React, { useState } from 'react';
import PropTypes from 'prop-types';

const VolunteerTableRow = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <tr style={{ cursor: 'pointer' }} onClick={() => { setIsOpen((prev) => !prev); }}>
        <td style={{ display: 'flex' }}>
          <div className="profile-pic" />
        </td>
        <td>
          {data.firstname}
          {' '}
          {data.lastname}
        </td>
        <td style={{ textAlign: 'end' }}>{data.sum}</td>
        <td>
          {/* TODO: add a better icon lmao */}
          {isOpen ? '^' : 'v'}
        </td>
      </tr>
      {isOpen
        ? (
          <tr>
            {/* TODO: style when high-fidelity is out */}
            <td colSpan={4}>
              Position:
              {' '}
              {data.permissions}
              <br />
              Volunteer Tier:
              {' '}
              {data.tier}
              <br />
              Birthday:
              {' '}
              {data.birthdate}
              <br />
              Gender:
              {' '}
              {data.gender}
              <br />
              Email:
              {' '}
              {data.email}
              <br />
              Phone:
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
