import React from 'react';

const ProgressBar = ({ label, percentage }) => {
  return (
    <div className='ml-20'>
      <p className=' text-white font-semibold gap-10'>
        {label} - {percentage}%
      </p>
      <div className='w-50 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'>
        <div
          className=' bg-blue-600 h-2.5 rounded-full'
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
