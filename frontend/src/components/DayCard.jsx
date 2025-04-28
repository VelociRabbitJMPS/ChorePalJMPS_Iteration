function DayCard({ day, choresForDay }) {
  return (
    <div>
      <h3>{day}</h3>
      <div>
        {choresForDay.map((chore) => (
          <div key={chore._id}>{chore.choreName}</div>
        ))}
        <h4>Kevin</h4>
        <ul>
          <li>Do the dishes</li>
        </ul>
      </div>
    </div>
  );
}

export default DayCard;
