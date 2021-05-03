import React, { useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import profilePlaceholder from '../../../assets/profileplaceholder.jpg';
import DownwardChevron from '../../../assets/downwardchevron.svg';
import EditPen from '../../../assets/editPen.svg';

import './userDirectoryRow.css';

// Rows supporting dropdowns
const UserDirectoryRow = ({ user, openModal }) => {
  const [rowOpen, setRowOpen] = useState(false);

  const ExpandedRow = () => {
    console.log('Testing');
    return (
      <div className="expanded-row">
        <div className="expanded-row-col">
          <span>
            Position:
            {' '}
            {user.permissions}
          </span>
          <span>
            Volunteer Tier:
            {' '}
            {user.volunteerTier}
          </span>
          <span>
            Age:
            {' '}
            {moment(new Date()).diff(user.birthdate, 'years')}
          </span>
        </div>
        <div className="expanded-row-col">
          <span>
            Gender:
            {' '}
            {user.gender}
          </span>
          <span>
            Email:
            {' '}
            {user.email}
          </span>
          <span>
            Phone Number:
            {' '}
            {user.phone}
          </span>
        </div>
        <div className="expanded-row-col">
          <span>
            {user.locationcity}
            {', '}
            {user.locationstate}
          </span>
          <span>
            Division:
            {' '}
            {user.division}
          </span>
          <span>
            Relevant Skills:
          </span>
        </div>
        <button
          type="button"
          className="ut-row-control-button"
          name="expand-row"
          aria-label="Expand Row"
          onClick={() => setRowOpen(!rowOpen)}
        >
          <img src={DownwardChevron} className="close-expanded-row-button" alt="arrowDown" />
        </button>
      </div>
    );
  };

  return (
    <tr>
      <td
        className="ut-row-wrapper"
      >
        <div className="ut-row">
          <img src={user.profile_picture || profilePlaceholder} className="ut-row-pfp" alt="" />
          <div className="ut-row-name">
            <p className="medium">{`${user.firstname} ${user.lastname}`}</p>
          </div>
          <button
            type="button"
            className="ut-edit-user-button"
            name="edit-user"
            aria-label="Edit User"
            onClick={() => openModal(user)}
          >
            <img src={EditPen} className="ut-edit-user-img" alt="editPen" />
          </button>
          {rowOpen
            ? null
            : (
              <button
                type="button"
                className="ut-row-control-button"
                name="expand-row"
                aria-label="Expand Row"
                onClick={() => setRowOpen(!rowOpen)}
              >
                <img src={DownwardChevron} className="expand-row-button" alt="arrowDown" />
              </button>
            )}
        </div>
        {rowOpen ? (<ExpandedRow />) : null}
      </td>
    </tr>
  );
};

/* eslint-disable react/forbid-prop-types */
UserDirectoryRow.propTypes = {
  user: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default UserDirectoryRow;
