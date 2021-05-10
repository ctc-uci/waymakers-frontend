/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { CSVLink } from 'react-csv';

import ExampleLightModalWithFormik from "../common/LightModal/ExampleLightModalWithFormik";
import { TitledCard } from '../common/Card';
import ExampleGenericTableWithUseMobile from '../common/Table/ExampleGenericTableWithUseMobile';
// import VerificationPage from '../pages/login/verificationPage';

const data = [
  {
    division: 'Division1',
    warehouseData: JSON.stringify([
      [
        {
          name: 'Bottled Water',
          quanitity: 201,
          needed: 99,
          warehouse_name: 'Warehouse 4',
        },
        {
          name: 'Balloon Animals',
          quanitity: 3,
          needed: 3000,
          warehouse_name: 'Warehouse 4',
        },
        {
          name: 'First Aid Kits',
          quanitity: 2,
          needed: 20,
          warehouse_name: 'Warehouse 4',
        },
        {
          name: 'Blankets',
          quanitity: 15,
          needed: 3,
          warehouse_name: 'Warehouse 4',
        },
        {
          name: 'Hoodies',
          quanitity: 12,
          needed: 0,
          warehouse_name: 'Warehouse 4',
        },
      ],
      [
        {
          name: 'Bottled Water',
          quanitity: 201,
          needed: 99,
          warehouse_name: 'Warehouse 5',
        },
        {
          name: 'Balloon Animals',
          quanitity: 3,
          needed: 3000,
          warehouse_name: 'Warehouse 5',
        },
        {
          name: 'First Aid Kits',
          quanitity: 2,
          needed: 20,
          warehouse_name: 'Warehouse 5',
        },
        {
          name: 'Blankets',
          quanitity: 15,
          needed: 3,
          warehouse_name: 'Warehouse 5',
        },
        {
          name: 'Hoodies',
          quanitity: 12,
          needed: 0,
          warehouse_name: 'Warehouse 5',
        },
      ],
    ], null, 2),
  },
  {
    division: 'Division2',
    warehouseData: JSON.stringify([
      {
        name: 'Bottled Water',
        quanitity: 201,
        needed: 99,
      },
      {
        name: 'Balloon Animals',
        quanitity: 3,
        needed: 3000,
      },
      {
        name: 'First Aid Kits',
        quanitity: 2,
        needed: 20,
      },
      {
        name: 'Blankets',
        quanitity: 15,
        needed: 3,
      },
      {
        name: 'Hoodies',
        quanitity: 12,
        needed: 0,
      },
    ], null, 2),
  },
];

const Test = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Click me to open modal</button>
      <ExampleLightModalWithFormik isModalOpen={isOpen} setIsModalOpen={setIsOpen}/>
      <ExampleGenericTableWithUseMobile />
      <h1>This is heading 1</h1>
      <h2>This is heading 2</h2>
      <h3>This is heading 3</h3>
      <h4>This is heading 4</h4>
      <p className="large">This is a large p</p>
      <p className="medium">This is a medium p</p>
      <p className="small">This is a small p</p>
      <TitledCard title="This is the title">
        Content inside the card
      </TitledCard>
      {/* <VerificationPage
        userID="mvLAsKySfcN9aSoQE5MnArYHrJE2"
        firstName="Billy"
        email="junkoemail248@gmail.com"
      /> */}
      <CSVLink
        data={data}
        filename="inventory_csv.csv"
      >
        Download Data
      </CSVLink>
    </>
  );
};

export default Test;
