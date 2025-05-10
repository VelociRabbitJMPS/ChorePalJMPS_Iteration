import { useState } from 'react';
import AddChoreForm from './AddChore';
import { useDispatch } from 'react-redux';
import { completeChore, deleteChore } from '../redux/choreSlice';

const DayCard = ({ day, chores }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const dispatch = useDispatch();
  const handleDropdownChange = async (e, chore) => {
    const value = e.target.value;
    if (value === 'Completed') {
      //completeChore and deleteChore are calling from redux, choreSlice
      dispatch(completeChore(chore));
    } else if (value === 'Delete') {
      dispatch(deleteChore(chore._id));
    }
  };

  return (
    <div className='bg-linear-to-r from-gray-300 via-gray-500 to-gray-700 text-blue-900 rounded-2xl shadow-lg p-5 flex flex-col gap-5 mt-6 w-90'>
      <h3 className='text-2xl font-bold tracking-wide'>{day.toUpperCase()}</h3>

      <div className='bg-surfaceLight rounded-xl p-4 flex flex-col gap-3'>
        {chores.length > 0 ? (
          <ul className='list-disc list-inside text-primaryDark space-y-1'>
            {chores.map((chore) => (
              <li
                key={chore._id}
                className={`text-base font-semibold ${
                  chore.status === 'Completed'
                    ? 'text-green-900'
                    : 'text-orange-800'
                }`}
              >
                {chore.childName} – {chore.choreName} -
                <select
                  onChange={(e) => handleDropdownChange(e, chore)}
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
          <p className='text-sm text-black/70 italic'>No chores assigned.</p>
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
