import React from 'react';
import { MdOutlineVideocamOff } from 'react-icons/md';

const NoResults = ({ text }) => {
  return (
    <div className="no-posts">
      <p className="mt-auto camera-icon">
        <MdOutlineVideocamOff />
      </p>
      <h3 className="mb-auto text-center">{text}</h3>
    </div>
  );
};

export default NoResults;
