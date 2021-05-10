/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
// import { Field } from 'formik';
import PropTypes from 'prop-types';
// import { useFormikContext } from 'formik';

import { WMKBackend } from '../../../common/utils';

import DownloadMultiField from './DownloadMultiField';

import './stepOne.css';
// import './DownloadMultiField.css';

const formFieldShape = {
  divisions: PropTypes.array,
};

const StepOne = (props) => {
  const {
    formField: {
      divisions,
    },
    setFieldValue,
  } = props;

  const [_divisions, setDivisions] = useState([]);
  // const { values: { divisions, warehouses: formWarehouseValue } } = useFormikContext();

  useEffect(async () => {
    const { data } = await WMKBackend.get('/divisions');
    // alert(JSON.stringify(data));

    setDivisions(data.map((division) => (
      { value: division.id, label: division.div_name }
    )));
    // alert(JSON.stringify(_divisions));
    // console.log(_divisions);
  }, []);

  // console.log(_divisions);

  return (
    <div className="download-step-one">
      <p className="medium">
        {divisions.label}
      </p>
      <DownloadMultiField
        id={divisions.name}
        name={divisions.name}
        options={_divisions}
        setFieldValue={setFieldValue}
      />
    </div>
  );
};

StepOne.propTypes = {
  formField: PropTypes.shape(formFieldShape).isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default StepOne;
