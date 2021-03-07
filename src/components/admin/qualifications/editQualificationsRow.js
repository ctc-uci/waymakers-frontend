import React from 'react';
import PropTypes from 'prop-types';

import './editQualifications.css';

const EditQualificationsRow = ({ qualification }) => (
  <tr>
    <td>
      {qualification.volunteer_tier}
    </td>
    <td>
      {qualification.qualification_name}
    </td>
    <td>
      {qualification.qualification_description}
    </td>
    <td>
      <button type="button" className="green-button">Update</button>
    </td>
    <td>
      <button type="button" className="red-button">Remove</button>
    </td>
  </tr>
);

EditQualificationsRow.propTypes = {
  qualification: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default EditQualificationsRow;
