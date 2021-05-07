import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useFormikContext } from 'formik';

import { WMKBackend } from '../../../common/utils';

import DownloadMultiField from './DownloadMultiField';

import './stepTwo.css';

const getFlavorText = (division) => `
  From the ${division} division, which warehouse(s) do you want to download
  inventory information from?
`;

const formFieldShape = {
  warehouses: PropTypes.array,
};

const StepTwo = (props) => {
  const {
    formField: {
      warehouses,
    },
    setFieldValue,
  } = props;

  const [warehousesPerDivision, setWarehousesPerDivision] = useState([]);
  const { values: { divisions, warehouses: formWarehouseValue } } = useFormikContext();

  useEffect(async () => {
    const promises = divisions.map(async (division) => {
      const { data: _warehouses } = await WMKBackend.get('/warehouses', {
        params: {
          division: division.value,
        },
      });

      return {
        division: division.label,
        warehouses: _warehouses.map((wh) => ({
          value: wh,
          label: wh.warehouse_name,
        })),
      };
    });

    const asyncRes = await Promise.all(promises);

    console.log(JSON.stringify(asyncRes));

    setWarehousesPerDivision(asyncRes);
  }, []);

  return (
    <div className="download-step-two">
      {warehousesPerDivision.map((division, i) => {
        if (!formWarehouseValue[i]) {
          formWarehouseValue[i] = [];
        }

        return (
          <>
            <p className="medium">{getFlavorText(division.division)}</p>
            <DownloadMultiField
              id={division.warehouse}
              name={warehouses.name}
              options={[
                {
                  label: 'All Warehouses',
                  value: 'All Warehouses',
                },
                ...division.warehouses,
              ]}
              setFieldValue={setFieldValue}
              onChange={(e) => {
                formWarehouseValue[i] = [...e];
              }}
            />
          </>
        );
      })}
    </div>
  );
};

StepTwo.propTypes = {
  formField: PropTypes.objectOf(formFieldShape).isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default StepTwo;
