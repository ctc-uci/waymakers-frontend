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
      <button type="button" className="btn btn-success rounded-pill">Update</button>
    </td>
    <td>
      <button type="button" className="btn btn-danger rounded-pill">Remove</button>
    </td>
  </tr>
);

EditQualificationsRow.propTypes = {
  qualification: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default EditQualificationsRow;
