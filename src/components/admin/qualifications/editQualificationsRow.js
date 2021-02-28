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
      UpdateButton
    </td>
    <td>
      RemoveButton
    </td>
  </tr>
);

export default EditQualificationsRow;
