/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import {
  LightModal, LightModalHeader, LightModalBody, LightModalButton,
} from '../../../common/LightModal';
import { wmkAPI } from '../../../common/utils';

const DeleteQualificationModal = ({ isModalOpen, setIsModalOpen, qualification }) => {
  const deleteQualification = async () => {
    try {
      const response = await wmkAPI.delete(`/qualifications/${qualification.id}`,
        { withCredentials: true });
      console.log(response);
    } catch (err) {
      // eslint-disable-next-line
      console.error(err);
    }
  };
  return (
    <LightModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <LightModalHeader title="Delete Qualification?" onClose={() => setIsModalOpen(false)} />
      <form onSubmit={() => deleteQualification()}>
        <LightModalBody>
          <LightModalButton danger type="submit">
            Delete
          </LightModalButton>
          <LightModalButton type="button" secondaryOutline onClick={() => setIsModalOpen(false)}>
            Cancel
          </LightModalButton>
        </LightModalBody>
      </form>
    </LightModal>
  );
};

DeleteQualificationModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  qualification: PropTypes.shape({
    id: PropTypes.number,
    qualification_name: PropTypes.string,
    volunteer_tier: PropTypes.number,
    qualification_description: PropTypes.string,
  }).isRequired,
};

export default DeleteQualificationModal;
