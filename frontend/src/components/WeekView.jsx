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
    <div>
      <div className='grid grid-cols-4 gap-x-5 gap-y-5'>
        {daysOfWeek.map((day) => {
          const choresForDay = chores.filter(
            (chore) => chore?.day?.toLowerCase?.() === day
          );

          //This ensures to not crash if chore.day is null or not a string.
          return <DayCard key={day} day={day} chores={choresForDay} />;
        })}
        <div></div>
      </div>
    </div>
  );
};

export default WeekView;
