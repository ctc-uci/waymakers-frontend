import React from 'react';
import PropTypes from 'prop-types';

import emailPic from '../../../assets/email.svg';
import phone from '../../../assets/phone.svg';
import house from '../../../assets/house.svg';
import TitledCard from '../../../common/Card/TitledCard';

import './Contact.css';

function Contact({
  className, email, number, address,
}) {
  return (
    <TitledCard title="Contact Info" className={className} cardClassName="contact-card-inner">
      <p>
        <img className="contact-icons" src={emailPic} alt="" />
        {` ${email}`}
      </p>
      <p>
        <img className="contact-icons" src={phone} alt="" />
        {` ${number}`}
      </p>
      <p>
        <img className="contact-icons" src={house} alt="" />
        {` ${address}`}
      </p>
    </TitledCard>
  );
}

Contact.defaultProps = {
  className: 'contact-card',
};

Contact.propTypes = {
  className: PropTypes.string,
  email: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
};

export default Contact;
