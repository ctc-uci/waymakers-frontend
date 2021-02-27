import React from 'react';
import QualificationsList from './QualificationsList';
import './QualificationInfo.css';

const QualificationInfo = () => {
  console.log('hi');
  const volunteers = [
    {
      name: 'Angela',
    },
    {
      name: 'Angela',
    },
    {
      name: 'Angela',
    },
  ];
  return (
    <div>
      <h3 className="heading">Qualification/Hour Information</h3>
      <QualificationsList volunteers={volunteers} title="List of Volunteers Who Need Hours Reviewed" buttonText="Review Hours" />
      <QualificationsList volunteers={volunteers} title="List of Volunteers Who Need Qualifications Reviewed" buttonText="Review Qualifications" />
    </div>
  );
};

export default QualificationInfo;
