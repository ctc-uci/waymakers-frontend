/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './editContact.css';

const EditContact = ({
  email, setEmail, firstName, setFirstName,
}) => {
  const [address, setAddress] = useState('');

  return (
    <div className="contactCard">
      <h2>Contact</h2>
      <form>
        <label htmlFor="bday">Email: </label>
        <input type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} />
        <br />
        <br />
        <label htmlFor="number">Phone Number: </label>
        <input type="tel" value={firstName} name="number" onChange={(e) => setFirstName(e.target.value)} />
        <br />
        <br />
        <label htmlFor="address">Address: </label>
        <input type="text" value={address} name="address" onChange={(e) => setAddress(e.target.value)} />
        {/* <input type="submit" /> */}
      </form>
    </div>

  );
};

export default EditContact;
