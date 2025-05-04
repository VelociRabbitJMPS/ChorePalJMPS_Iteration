import React from 'react';

const ProgressBar = ({ label, percentage }) => {
  let progressColor = 'bg-red-500';
  if (percentage === 100) {
    progressColor = 'bg-green-500';
  } else if (percentage >= 50) {
    progressColor = 'bg-blue-600';
  }

  return (
    <div className='ml-20 mb-2'>
      <p className=' text-white font-semibold gap-10 '>
        {label} - {percentage}%
      </p>
      <div className='w-50 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'>
        <div
          className={`${progressColor} h-2.5 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
