import React from 'react';
import PropTypes from 'prop-types';

import './editQualificationsRow.css';

const EditQualificationsRow = ({ qualification, openUpdateModal }) => (
  <tr className="edit-qualification-row">
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
      <button type="button" className="green-button" onClick={() => openUpdateModal(qualification)}>Update</button>
    </td>
    <td>
      <button type="button" className="red-button">Remove</button>
    </td>
  </tr>
);

EditQualificationsRow.propTypes = {
  qualification: PropTypes.oneOfType([PropTypes.object]).isRequired,
  openUpdateModal: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default EditQualificationsRow;
