import React, { useState } from 'react';
import PropTypes from 'prop-types';

import UpdateQualificationModal from './updateQualificationModal';
import './editQualificationsRow.css';

const EditQualificationsRow = ({ qualification }) => {
  const [isUpdateQualModalOpen, setIsUpdateQualModalOpen] = useState(false);
  return (
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
        <button type="button" className="green-button" onClick={() => setIsUpdateQualModalOpen(true)}>Update</button>
        {isUpdateQualModalOpen
          && (
          <UpdateQualificationModal
            isModalOpen={isUpdateQualModalOpen}
            setIsModalOpen={setIsUpdateQualModalOpen}
            qualification={qualification}
          />
          )}
      </td>
      <td>
        <button type="button" className="red-button">Remove</button>
      </td>
    </tr>
  );
};

EditQualificationsRow.propTypes = {
  qualification: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default EditQualificationsRow;
