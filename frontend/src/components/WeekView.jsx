import DayCard from '../components/DayCard';

const daysOfWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const WeekView = ({ chores }) => {
  return (
    <div className='weekview-container'>
      {daysOfWeek.map((day) => {
        const choresForDay = chores.filter(
          (chore) => chore.day.toLowerCase() === day
        );

        return <DayCard key={day} day={day} chores={choresForDay} />;
      })}
    </div>
  );
};

export default WeekView;
