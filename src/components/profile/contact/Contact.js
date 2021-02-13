/* eslint-disable react/prop-types */
import React from 'react';
import './Contact.css';

import emailPic from '../../../images/email.png';
import phone from '../../../images/phone.png';
import house from '../../../images/house.png';

function Contact({ email, number, address }) {
  return (
    <div className="cntctCard">
      <h2>Contact Info</h2>
      <div>
        <p>
          <img className="contactImg" src={emailPic} alt="" width="15px" height="15px" />
          {` ${email}`}
        </p>
        <p>
          <img className="contactImg" src={phone} alt="" width="15px" height="15px" />
          {` ${number}`}
        </p>
        <p>
          <img className="contactImg" src={house} alt="" width="15px" height="15px" />
          {` ${address}`}
        </p>
      </div>

    </div>
  );
}

export default Contact;
