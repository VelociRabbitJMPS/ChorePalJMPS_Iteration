import DayCard from './DayCard';

function WeekView() {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return (
    <div>
      <h2>Week</h2>
      <div>
        {daysOfWeek.map((day, index) => (
          <DayCard key={index} dayName={day} />
        ))}
      </div>
    </div>
  );
}

export default WeekView;
