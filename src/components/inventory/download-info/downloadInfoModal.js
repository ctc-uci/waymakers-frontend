/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';

import { WMKBackend } from '../../../common/utils';

import DownloadMultiField from './DownloadMultiField';
import CSVDownloadButton from './CSVDownloadButton';

import {
  LightModal, LightModalHeader, LightModalBody,
} from '../../../common/LightModal';

import './downloadInfoModal.css';

const UpdateUserModal = ({ isModalOpen, setIsModalOpen }) => {
  const [_divisions, setDivisions] = useState([]);
  const formikRef = useRef();

  const handleSubmit = (values, actions) => {
    console.log(JSON.stringify(values));
    alert(JSON.stringify(values));
    actions.setTouched([]);
    actions.setSubmitting(false);
    setIsModalOpen(false);
  };

  // Resetting state on modal close
  useEffect(() => {
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
  }, [isModalOpen]);

  useEffect(async () => {
    const { data } = await WMKBackend.get('/divisions');

    setDivisions(data.map((division) => (
      { value: division.id, label: division.div_name }
    )));
  }, []);

  return (
    <LightModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} className="download-modal">
      <LightModalHeader title="Download Inventory Information" onClose={() => setIsModalOpen(false)} />
      <LightModalBody className="download-modal-body">
        <Formik
          innerRef={formikRef}
          onSubmit={handleSubmit}
          initialValues={{
            divisions: [],
          }}
        >
          {({ values, setFieldValue }) => (
            <Form id="registerForm" key="download" className="download-form">
              <p className="medium">
                Which division(s) do you want to download inventory information from?*
              </p>
              <DownloadMultiField
                id="divisions"
                name="divisions"
                labelClassName="select-divisions-label"
                inputClassName="select-divisions"
                options={_divisions}
                setFieldValue={setFieldValue}
              />
              <CSVDownloadButton
                type="submit"
                divisions={values.divisions}
              >
                <p>Download Here</p>
              </CSVDownloadButton>
            </Form>
          )}
        </Formik>
      </LightModalBody>
    </LightModal>
  );
};

UpdateUserModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};

export default UpdateUserModal;
