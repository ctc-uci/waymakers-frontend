/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import ExampleLightModalWithFormik from "../common/LightModal/ExampleLightModalWithFormik";
import { TitledCard } from '../common/Card';
import ExampleGenericTableWithUseMobile from '../common/Table/ExampleGenericTableWithUseMobile';
import VerificationPage from '../pages/login/verificationPage';

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
    </>
  );
};

export default Test;
