import React from 'react';
import { useFormikContext } from 'formik';

const getFlavorText = (division) => `
  From the ${division} division, which warehouse(s) do you want to download
  inventory information from?
`;

/*
values Shape:
  {
    "divisions": [
      {
        "value": 3,
        "label": "Crime Response Team"
      },
      {
        "value": 6,
        "label": "Food"
      }
    ],
    "warehouses": [
      [
        {
          "value": {
            "id": 4,
            "warehouse_name": "Warehouse 4",
            "div_num": 3
          },
          "label": "Warehouse 4"
        }
      ],
      [
        {
          "value": {
            "id": 40,
            "warehouse_name": "FoodWarehouse",
            "div_num": 6
          },
          "label": "FoodWarehouse"
        }
      ]
    ]
  }
*/
const StepThree = () => {
  const { values: { divisions, warehouses } } = useFormikContext();

  return (
    <div className="download-step-three">
      <div className="div-list-section">
        <p className="medium">Which division(s) do you want to download inventory information from?</p>
        <p className="medium">
          {divisions.map((division) => division.label).join(', ')}
        </p>
      </div>
      <div className="wh-list-section">
        {divisions.map((division, i) => (
          <>
            <p className="medium">{getFlavorText(division.label)}</p>
            <p className="medium">
              {/* {console.log(warehouses[i])} */}
              {warehouses[i].map((warehouse) => warehouse.value.warehouse_name).join(', ')}
            </p>
          </>
        ))}
      </div>
    </div>
  );
};

export default StepThree;
