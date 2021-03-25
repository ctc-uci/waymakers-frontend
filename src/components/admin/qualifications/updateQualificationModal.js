/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import {
  useFormik,
} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  LightModal, LightModalHeader, LightModalBody, LightModalButton,
} from '../../../common/LightModal';
import {
  ValidatedField,
} from '../../../common/formikExtensions';

// Using Yup to do schema validation
const schema = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  tier: Yup.string()
    .required('Required'),
  link: Yup.string()
    .required('Required'),
});

const UpdateQualificationModal = ({ isModalOpen, setIsModalOpen, qualificationID }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      tier: '',
      link: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // eslint-disable-next-line no-undef
      alert(JSON.stringify(values, null, 2));
    },
    // validate only on submit, change as needed
    validateOnSubmit: true,
    validateOnBlur: false,
    validateOnChange: false,
  });

  const getQualification = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/qualifications/${qualificationID}`,
        { withCredentials: true },
      );
      console.log(response.data);
      formik.values.name = (response.data.qualification_name);
      formik.values.tier = (response.data.volunteerTier);
      formik.values.link = (response.data.qualification_description);
    } catch (err) {
      // eslint-disable-next-line
      console.error(err);
    }
  };

  getQualification();

  return (
    <LightModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <LightModalHeader title="Update Qualification Information" onClose={() => setIsModalOpen(false)} />
      <form onSubmit={formik.handleSubmit}>
        <LightModalBody>

          {/* DIY formik */}

          <ValidatedField name="name" labelText="Name" formik={formik}>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name && formik.touched.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
          </ValidatedField>
          <ValidatedField name="tier" labelText="Tier" formik={formik}>
            <select
              id="tier"
              name="tier"
              onChange={formik.handleChange}
            >
              <option value="none" selected hidden> </option>
              <option value="tier1">Tier 1</option>
              <option value="tier2">Tier 2</option>
              <option value="tier3">Tier 3</option>
            </select>
          </ValidatedField>
          {/* Using LightModalValidatedField */}
          <ValidatedField name="link" labelText="Link" formik={formik}>
            <input
              id="link"
              name="link"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.link}
            />
          </ValidatedField>

          <LightModalButton primary type="submit">
            Submit
          </LightModalButton>
          <LightModalButton type="button" secondaryOutline onClick={() => setIsModalOpen(false)}>
            Cancel
          </LightModalButton>
        </LightModalBody>
      </form>
    </LightModal>
  );
};

UpdateQualificationModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  qualificationID: PropTypes.number.isRequired,
};

export default UpdateQualificationModal;

// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import Modal from 'react-modal';

// const axios = require('axios');

// const UpdateQualificationModal = ({ modalOpen, setModalOpen, qualificationID }) => {
//   // State variable for all editable fields
//   const [name, setName] = useState('');
//   const [volunteerTier, setVolunteerTier] = useState();
//   const [description, setDescription] = useState('');

//   // Get qualification by ID
//   const getQualification = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_HOST}:${proce
// ss.env.REACT_APP_PORT}/qualifications/${qualificationID}`,
//         { withCredentials: true },
//       );
//       setName(response.data.qualification_name);
//       setVolunteerTier(response.data.volunteerTier);
//       setDescription(response.data.qualification_description);
//     } catch (err) {
//       // eslint-disable-next-line
//       console.error(err);
//     }
//   };

//   // Handle form submit
//   const handleSubmit = async () => {
//     try {
//       await axios.post(
//         `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/qualifications`,
//         {
//           name,
//           description,
//           volunteer_tier: volunteerTier,
//         },
//         { withCredentials: true },
//       );
//     } catch (err) {
//       // eslint-disable-next-line
//       console.error(err);
//     }
//     setModalOpen(false);
//   };

//   // Get qualifcation data on modalOpen change
//   useEffect(() => {
//     if (modalOpen) {
//       getQualification();
//     }
//   }, [modalOpen]);

//   return (
//     <div>
//       <Modal
//         className="add-item-modal-content"
//         overlayClassName="add-item-modal-overlay"
//         isOpen={modalOpen}
//         onRequestClose={() => setModalOpen(false)}
//       >
//         <button type="button" onClick={() => setModalOpen(false)}>X</button>
//         <div>
//           <h3>
//             Add Qualification Information
//           </h3>
//           <form onSubmit={handleSubmit} id="add-qualification-form">
//             <label htmlFor="name" className="form-label">
//               Name:
//               <input
//                 id="name"
//                 type="text"
//                 className="form-input"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </label>
//             <label htmlFor="tier" className="form-label">
//               Tier:
//               <input
//                 id="tier"
//                 type="number"
//                 className="form-input"
//                 value={volunteerTier}
//                 onChange={(e) => setVolunteerTier(e.target.value)}
//               />
//             </label>
//             <label htmlFor="description">
//               Description:
//               <textarea
//                 id="description"
//                 type="textarea"
//                 className="form-textarea"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </label>
//             <input type="submit" value="Submit" />
//             <button type="button" onClick={() => setModalOpen(false)}>Cancel</button>
//           </form>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// UpdateQualificationModal.propTypes = {
//   modalOpen: PropTypes.bool.isRequired,
//   setModalOpen: PropTypes.func.isRequired,
//   qualificationID: PropTypes.number.isRequired,
// };

// export default UpdateQualificationModal;
