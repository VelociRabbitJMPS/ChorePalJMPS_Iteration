import DayCard from '../components/DayCard';

function WeekView({ chores }) {
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
          <DayCard
            key={index}
            day={day}
            choresForDay={chores.filter((chore) => chore.day === day)}
          />
        ))}
      </div>
    </div>
  );
}

export default WeekView;
