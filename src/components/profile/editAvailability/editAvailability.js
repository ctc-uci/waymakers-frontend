import React, { useState } from 'react';
import './editAvailability.css';

const EditAvailability = () => {
  const [avail, setAvail] = useState('');

  return (
    <div className="availCard">
      <h2>Availability</h2>
      <form>
        <textarea name="availability" rows="15" cols="85" value={avail} onChange={(e) => setAvail(e.target.value)} />
        <br />
        {/* <input type="submit" /> */}
      </form>
    </div>
  );
};

export default EditAvailability;
