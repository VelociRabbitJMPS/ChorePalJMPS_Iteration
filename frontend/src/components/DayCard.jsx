import { useState, useEffect } from 'react';
import AddChoreForm from './AddChore';

const DayCard = ({ day, chores }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  // const [selectedValue, setSelectedValue] = useState(null);
  const [choreList, setChoreList] = useState(chores);

  useEffect(() => {
    setChoreList(chores);
  }, [chores]);

  const handleDropdownChange = async (e, choreId) => {
    const value = e.target.value;
    if (value === 'Completed') {
      const updatedChore = choreList.find((chore) => chore._id === choreId);
      if (!updatedChore) return;

      const choreWithUpdatedStatus = {
        ...updatedChore,
        isCompleted: true,
        status: 'Completed',
      };

      setChoreList((prevChores) =>
        prevChores.map((chore) =>
          chore._id === choreId ? choreWithUpdatedStatus : chore
        )
      );

      await fetch(`http://localhost:3000/chores/${choreId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(choreWithUpdatedStatus),
      });
    }
    if (value === 'Delete') {
      setChoreList((prevChores) =>
        prevChores.filter((chore) => chore._id !== choreId)
      );
      await fetch(`http://localhost:3000/chores/${choreId}`, {
        method: 'DELETE',
      });
    }
  };
  return (
    <div className='bg-primaryDark text-white rounded-2xl shadow-lg p-5 flex flex-col gap-5 mt-6 w-96'>
      <h3 className='text-2xl font-bold tracking-wide'>{day.toUpperCase()}</h3>

      <div className='bg-surfaceLight rounded-xl p-4 flex flex-col gap-3'>
        {chores.length > 0 ? (
          <ul className='list-disc list-inside text-primaryDark space-y-1'>
            {choreList.map((chore) => (
              <li
                key={chore._id}
                className={`text-base font-semibold ${
                  chore.status === 'Completed'
                    ? 'text-green-500'
                    : 'text-accentOrange'
                }`}
              >
                {chore.childName} – {chore.choreName} -
                <select
                  onChange={(e) => handleDropdownChange(e, chore._id)}
                  value={chore.status}
                >
                  <option
                    value='Pending'
                    disabled={chore.status === 'Completed'}
                  >
                    Select
                  </option>
                  <option value='Completed'>Completed</option>
                  <option value='Delete'>Delete</option>
                </select>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-sm text-white/70 italic'>No chores assigned.</p>
        )}

        <button
          onClick={() => setShowAddForm(true)}
          className='self-start bg-accentOrange text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-accentOrangeDark transition duration-200'
        >
          Add New Chore
        </button>

        {showAddForm && (
          <AddChoreForm day={day} onClose={() => setShowAddForm(false)} />
        )}
      </div>
    </div>
  );
};

export default DayCard;
