import React from 'react';

import './editQualifications.css';

const EditQualificationsRow = (qualification) => (
  <tr>
    <td>
      {qualification.qualification.volunteer_tier}
    </td>
    <td>
      {qualification.qualification.qualification_name}
    </td>
    <td>
      {qualification.qualification.qualification_description}
    </td>
    <td>
      <button type="button" className="btn btn-success rounded-pill">Update</button>
    </td>
    <td>
      <button type="button" className="btn btn-danger rounded-pill">Remove</button>
    </td>
  </tr>
);

export default EditQualificationsRow;
