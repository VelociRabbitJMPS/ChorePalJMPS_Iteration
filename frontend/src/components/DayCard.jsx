const DayCard = ({ day, chores }) => {
  return (
    <div className='bg-primaryDark text-white rounded-2xl shadow-lg p-5 flex flex-col gap-5 mt-6 w-96'>
      <h3 className='text-2xl font-bold tracking-wide'>{day.toUpperCase()}</h3>

      <div className='bg-surfaceLight rounded-xl p-4 flex flex-col gap-3'>
        {chores.length > 0 ? (
          <ul className='list-disc list-inside text-primaryDark space-y-1'>
            {chores.map((chore) => (
              <li
                key={chore._id}
                className='text-accentOrange text-base font-semibold'
              >
                {chore.childName} – {chore.choreName}
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-sm text-white/70 italic'>No chores assigned.</p>
        )}

        <button className='self-start bg-accentOrange text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-accentOrangeDark transition duration-200'>
          Add New Chore
        </button>
      </div>
    </div>
  );
};

export default DayCard;
