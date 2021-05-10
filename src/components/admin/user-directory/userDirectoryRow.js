import React, { useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import useMobileWidth from '../../../common/useMobileWidth';
import profilePlaceholder from '../../../assets/profileplaceholder.jpg';
import DownwardChevron from '../../../assets/downwardchevron.svg';
import penIcon from '../../../assets/editPen.svg';
import clockIcon from '../../../assets/clock.svg';
import genderIcon from '../../../assets/gender.svg';
import emailIcon from '../../../assets/email.svg';
import phoneIcon from '../../../assets/phone.svg';
import locationIcon from '../../../assets/blueLocationPin.svg';

import './userDirectoryRow.css';

// Rows supporting dropdowns
const UserDirectoryRow = ({ user, openModal, divisionList }) => {
  const [rowOpen, setRowOpen] = useState(false);
  const isMobile = useMobileWidth();

  const ExpandedRow = () => (
    <div className="expanded-row">
      <div className="expanded-row-col">
        <span>
          {isMobile ? null : <img className="row-icons" src={clockIcon} alt="" />}
          Position:
          {' '}
          {user.permissions}
        </span>
        <span className="row-iconless-span">
          Age:
          {' '}
          {moment(new Date()).diff(user.birthdate, 'years')}
        </span>
      </div>
      <div className="expanded-row-col">
        <span>
          {isMobile ? null : <img className="row-icons" src={genderIcon} alt="" />}
          Gender:
          {' '}
          {user.gender}
        </span>
        <span>
          {isMobile ? null : <img className="row-icons" src={emailIcon} alt="" />}
          Email:
          {' '}
          {user.email}
        </span>
        <span>
          {isMobile ? null : <img className="row-icons" src={phoneIcon} alt="" />}
          Phone Number:
          {' '}
          {user.phone}
        </span>
      </div>
      <div className="expanded-row-col">
        <span>
          {isMobile ? null : <img className="row-icons" src={locationIcon} alt="" />}
          {isMobile ? 'Location: ' : ''}
          {user.locationcity}
          {', '}
          {user.locationstate}
        </span>
        <span className="row-iconless-span">
          Division:
          {' '}
          {user.division ? (divisionList[user.division]).div_name : 'None' }
        </span>
      </div>
      <button
        type="button"
        className="ut-row-close-button"
        name="expand-row"
        aria-label="Close Row"
        onClick={() => setRowOpen(!rowOpen)}
      >
        <img src={DownwardChevron} className="close-expanded-row-button" alt="arrowDown" />
      </button>
    </div>
  );

  return (
    <tr>
      <td
        className="ut-row-wrapper"
      >
        <div className="ut-row">
          <img src={user.profile_picture || profilePlaceholder} className="ut-row-pfp" alt="" />
          <div className="ut-row-name">
            <p className="large">{`${user.firstname} ${user.lastname}`}</p>
          </div>
          <button
            type="button"
            className="ut-edit-user-button"
            name="edit-user"
            aria-label="Edit User"
            onClick={() => openModal(user)}
          >
            <img src={penIcon} className="ut-edit-user-img" alt="editPen" />
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
  divisionList: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default UserDirectoryRow;
