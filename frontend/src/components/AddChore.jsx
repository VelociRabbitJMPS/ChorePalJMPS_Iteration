import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addChore, fetchChores } from '../redux/choreSlice';
//we have to work on iteration project
const AddChoreForm = ({ day, onClose }) => {
  const dispatch = useDispatch();
  const [choreName, setChoreName] = useState('');
  const [childName, setChildName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (choreName.trim() === '' || childName.trim() === '') {
      alert('Please fill in both fields.');
      return;
    }

    const newChore = {
      choreName,
      childName,
      day,
      isWeekly: false,
      isCompleted: false,
      rating: null,
      image: null,
    };

    await dispatch(addChore(newChore));
    await dispatch(fetchChores());
    onClose();
  };

  return (
    <div>
      <h3>Add New Chore for {day.toUpperCase()}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Chore Name:</label>
          <input
            type='text'
            value={choreName}
            onChange={(e) => setChoreName(e.target.value)}
          />
        </div>
        <div>
          <label>Child Name:</label>
          <input
            type='text'
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
          />
        </div>
        <button type='submit'>Add Chore</button>
        <button type='button' onClick={onClose} style={{ marginLeft: '10px' }}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddChoreForm;
