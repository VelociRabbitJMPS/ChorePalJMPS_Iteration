import React from 'react';
import ProgressBar from './ProgressBar';

const ProgressWeekly = ({ choreList }) => {
  //need to collect chore count by child name
  //sam - [chore1, chore2]
  //peter - [chore3]
  const choresByChild = choreList.reduce((acc, chore) => {
    const name = chore.childName?.trim();
    //skip the chore if the name is empty
    if (!name) return acc;

    if (!acc[name]) {
      acc[name] = [];
    }
    acc[name].push(chore);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(choresByChild).map(([childName, chores]) => {
        const total = chores.length;
        const completed = chores.filter((c) => c.status === 'Completed').length;
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
        return (
          <ProgressBar key={childName} label={childName} percentage={percent} />
        );
      })}
    </div>
  );
};

export default ProgressWeekly;
