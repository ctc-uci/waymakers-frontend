import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { getEditing } from '../redux/selectors';

import DownloadInfoModal from './downloadInfoModal';

import './downloadInfo.css';

const DownloadInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    console.log('Download button press');
    setIsModalOpen(true);
  };

  const downloadButton = (
    <>
      <DownloadInfoModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <button
        type="button"
        className="download-button"
        name="download-information"
        aria-label="Download Information"
        onClick={handleClick}
      >
        {/* <span className="start-edits-icon" /> */}
        Download Information
      </button>
    </>
  );

  return useSelector(getEditing) ? null : downloadButton;
};

export default DownloadInfo;
