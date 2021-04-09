import React from 'react';

import ExampleGenericDesktopTable from './ExampleGenericDesktopTable';
import ExampleGenericMobileTable from './ExampleGenericMobileTable';

import useMobileWidth from '../useMobileWidth';

const ExampleGenericTableWithUseMobile = () => {
  const isMobile = useMobileWidth();

  return (
    <>
      {isMobile
        ? <ExampleGenericMobileTable />
        : <ExampleGenericDesktopTable /> }
    </>
  );
};

export default ExampleGenericTableWithUseMobile;
