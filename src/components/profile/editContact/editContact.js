/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './editContact.css';
import TitledCard from '../../../common/Card/TitledCard';

import emailPic from '../../../assets/email.svg';
import phone from '../../../assets/phone.svg';
import house from '../../../assets/house.svg';

const EditContact = ({
  email, setEmail, firstName, setFirstName,
}) => {
  const [address, setAddress] = useState('');

  return (
    <TitledCard title="Contact" className="contact-card">
      <form>
        <div className="contact-input">
          <img className="contact-icons" src={emailPic} alt="" />
          <input type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="contact-input">
          <img className="contact-icons" src={phone} alt="" />
          <input type="tel" value={firstName} name="number" onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="contact-input">
          <img className="contact-icons" src={house} alt="" />
          <input type="text" value={address} name="address" onChange={(e) => setAddress(e.target.value)} />
        </div>
      </form>
    </TitledCard>

  );
};

export default EditContact;
