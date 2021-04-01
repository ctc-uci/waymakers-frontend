/* eslint-disable react/prop-types */
import React from 'react';
import './Contact.css';

import emailPic from '../../../assets/email.svg';
import phone from '../../../assets/phone.svg';
import house from '../../../assets/house.svg';
import TitledCard from '../../../common/Card/TitledCard';

function Contact({ email, number, address }) {
  return (
    <TitledCard title="Contact Info" className="contact-card">
      <p>
        <img className="about-icons" src={emailPic} alt="" />
        {` ${email}`}
      </p>
      <p>
        <img className="about-icons" src={phone} alt="" />
        {` ${number}`}
      </p>
      <p>
        <img className="about-icons" src={house} alt="" />
        {` ${address}`}
      </p>
    </TitledCard>
  );
}

export default Contact;
