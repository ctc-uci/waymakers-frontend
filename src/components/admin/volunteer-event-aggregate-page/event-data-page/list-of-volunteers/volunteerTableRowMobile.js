import { React, useState } from 'react';
import PropTypes from 'prop-types';
import {
  MobileTableRowHeader, MobileTableRow, MobileTableContent, Divider,
} from '../../../../../common/MobileTable';
import toggleOpen from '../../../../../assets/datatoggleopen.svg';
import toggleClose from '../../../../../assets/datatoggleclose.svg';

const VolunteerTableRowMobile = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MobileTableRow style={{ cursor: 'pointer' }} onClick={() => { setIsOpen((prev) => !prev); }}>
        <MobileTableRowHeader>
          <div className="profile-pic" style={{ display: 'inline-block' }} />
          {' '}
          {data.lastname}
          {' '}
          {data.firstname}
        </MobileTableRowHeader>
        <MobileTableContent>
          Number of Hours:
          {' '}
          {data.sum}
          <img alt="" src={isOpen ? toggleClose : toggleOpen} style={{ float: 'right' }} />
        </MobileTableContent>
        {isOpen
          ? (
            <>
              <Divider />
              <MobileTableContent>
                <span className="bold">Position: </span>
                {data.permissions}
              </MobileTableContent>
              <MobileTableContent>
                <span className="bold">Gender: </span>
                {data.gender}
              </MobileTableContent>
              <MobileTableContent>
                <span className="bold">Volunteer Tier: </span>
                {data.tier}
              </MobileTableContent>
              <MobileTableContent>
                <span className="bold">Email: </span>
                {data.email}
              </MobileTableContent>
              <MobileTableContent>
                <span className="bold">Birthday: </span>
                {data.birthdate}
              </MobileTableContent>
              <MobileTableContent>
                <span className="bold">Phone Number: </span>
                {data.phone}
              </MobileTableContent>
            </>
          ) : null}
      </MobileTableRow>
    </>
  );
};

VolunteerTableRowMobile.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export default VolunteerTableRowMobile;
