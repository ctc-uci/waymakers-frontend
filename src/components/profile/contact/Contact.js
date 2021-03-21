/* eslint-disable react/prop-types */
import React from 'react';
import './Contact.css';

import emailPic from '../../../assets/email.png';
import phone from '../../../assets/phone.png';
import house from '../../../assets/house.png';

function Contact({ email, number, address }) {
  return (
    <div className="contactCard">
      <h2>Contact Info</h2>
      <div>
        <p>
          <img src={emailPic} alt="" width="15px" height="15px" />
          {` ${email}`}
        </p>
        <p>
          <img src={phone} alt="" width="15px" height="15px" />
          {` ${number}`}
        </p>
        <p>
          <img src={house} alt="" width="15px" height="15px" />
          {` ${address}`}
        </p>
      </div>

    </div>
  );
}

export default Contact;
