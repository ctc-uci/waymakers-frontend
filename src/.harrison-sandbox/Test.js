/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import ExampleLightModalWithFormik from "../common/LightModal/ExampleLightModalWithFormik";

const Test = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Click me to open modal</button>
      <ExampleLightModalWithFormik isModalOpen={isOpen} setIsModalOpen={setIsOpen}/>
    </>
  );
};

export default Test;
