const DayCard = ({ day, chores }) => {
  return (
    <div className='daycard'>
      <h3>{day.toUpperCase()}</h3>
      {chores.length > 0 ? (
        <ul>
          {chores.map((chore) => (
            <li key={chore._id}>
              {chore.childName} - {chore.choreName}
            </li>
          ))}
        </ul>
      ) : (
        <p>No chores assigned.</p>
      )}
    </div>
  );
};

export default DayCard;
