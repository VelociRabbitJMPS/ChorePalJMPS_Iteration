import React from 'react';
import ProgressBar from './ProgressBar';

const ProgressWeekly = ({ choreList }) => {
  //need to collect chore count by child name
  //sam - [chore1, chore2]
  //peter - [chore3]
  const choresByChild = choreList.reduce((acc, chore) => {
    const name = chore.childName?.trim();
    console.log('name', name);
    //skip the chore if the name is empty
    if (!name) return acc;

    if (!acc[name]) {
      acc[name] = [];
    }
    acc[name].push(chore);
    return acc;
  }, {});
  console.log('choresByChild', choresByChild);
  //choresByChild.length
  //store how many complete out of total
  //choreList.childName
  //choreList.status
  //completed/total
  return (
    <div>
      {Object.entries(choresByChild).map(([childName, chores]) => {
        const total = chores.length;
        console.log('total', total);
        const completed = chores.filter((c) => c.status === 'Completed').length;
        console.log('completed', completed);
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
        console.log('percent', percent);
        return (
          <div style={{ marginBottom: '10px' }}>
            <ProgressBar
              key={childName}
              label={childName}
              percentage={percent}
            />
            {/* task completion with text */}
            <div
              style={{ marginTop: '10px', marginLeft: '80px', color: 'yellow' }}
            >
              {completed} of {total} completed
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressWeekly;
