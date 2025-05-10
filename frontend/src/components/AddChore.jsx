import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchChores } from '../redux/choreSlice';
import { getImageFilenameForChore } from '../utils/choreImageMap';

const AddChoreForm = ({ day, onClose }) => {
  const [choreName, setChoreName] = useState('');
  const [childName, setChildName] = useState('');
  const [isWeekly, setIsWeekly] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (choreName.trim() === '' || childName.trim() === '') {
      alert('Please fill in both fields.');
      return;
    }
    const imageFilename = getImageFilenameForChore(choreName);

    const formData = {
      choreName,
      childName,
      day,
      isWeekly,
      isCompleted: false,
      rating: null,
      image: imageFilename, // This links to a file already in the S3 bucket
    };

    try {
      await axios.post('http://localhost:3000/chores', formData); // or /add-chore-no-upload if that's a better route
      // window.location.reload();
      dispatch(fetchChores()); // re-fetch updated list from backend
      onClose(); // Close the modal/form
    } catch (err) {
      console.error('Failed to add chore:', err);
    }
  };

  return (
    <div className='bg-white p-4 rounded shadow-md mt-4'>
      <h3>Add New Chore for {day.toUpperCase()}</h3>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <div>
          <label htmlFor='chore-name'>Chore Name:</label>
          <input
            id='chore-name'
            type='text'
            value={choreName}
            onChange={(e) => setChoreName(e.target.value)}
            className='border p-2 rounded'
            required
          />
        </div>
        <div>
          <label htmlFor='child-name'>Child Name:</label>
          <input
            id='child-name'
            type='text'
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className='border p-2 rounded'
            required
          />
          <label className='flex items-center gap-2'>
            <input
              type='checkbox'
              checked={isWeekly}
              onChange={(e) => setIsWeekly(e.target.checked)}
            />
            Weekly chore?
          </label>
        </div>
        <div className='flex gap-2'>
          <button
            type='submit'
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'
          >
            Save
          </button>
          <button
            type='button'
            onClick={onClose}
            className='bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddChoreForm;

// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addChore, fetchChores } from '../redux/choreSlice';
// import { uploadChoreImage } from '../api'; // <-- use API helper

// const AddChoreForm = ({ day, onClose }) => {
//   const dispatch = useDispatch();
//   const [choreName, setChoreName] = useState('');
//   const [childName, setChildName] = useState('');
//   const [imageFile, setImageFile] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (choreName.trim() === '' || childName.trim() === '') {
//       alert('Please fill in both fields.');
//       return;
//     }

//     let imageFilename = null;

//     if (imageFile) {
//       try {
//         imageFilename = await uploadChoreImage(imageFile);
//       } catch {
//         alert('Image upload failed. Please try again.');
//         return;
//       }
//     }

//     const newChore = {
//       choreName,
//       childName,
//       day,
//       isWeekly: false,
//       isCompleted: false,
//       rating: null,
//       image: imageFilename,
//     };

//     await dispatch(addChore(newChore));
//     await dispatch(fetchChores());
//     onClose();
//   };

//   return (
//     <div>
//       <h3>Add New Chore for {day.toUpperCase()}</h3>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Chore Name:</label>
//           <input
//             type='text'
//             value={choreName}
//             onChange={(e) => setChoreName(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Child Name:</label>
//           <input
//             type='text'
//             value={childName}
//             onChange={(e) => setChildName(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Upload Icon (optional):</label>
//           <input
//             type='file'
//             accept='image/*'
//             onChange={(e) => setImageFile(e.target.files[0])}
//           />
//         </div>
//         <button type='submit'>Add Chore</button>
//         <button type='button' onClick={onClose} style={{ marginLeft: '10px' }}>
//           Cancel
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddChoreForm;

// use this as backup default code
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addChore, fetchChores } from '../redux/choreSlice';
// //we have to work on iteration project
// const AddChoreForm = ({ day, onClose }) => {
//   const dispatch = useDispatch();
//   const [choreName, setChoreName] = useState('');
//   const [childName, setChildName] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (choreName.trim() === '' || childName.trim() === '') {
//       alert('Please fill in both fields.');
//       return;
//     }

//     const newChore = {
//       choreName,
//       childName,
//       day,
//       isWeekly: false,
//       isCompleted: false,
//       rating: null,
//       image: null,
//     };

//     await dispatch(addChore(newChore));
//     await dispatch(fetchChores());
//     onClose();
//   };

//   return (
//     <div>
//       <h3>Add New Chore for {day.toUpperCase()}</h3>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Chore Name:</label>
//           <input
//             type='text'
//             value={choreName}
//             onChange={(e) => setChoreName(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Child Name:</label>
//           <input
//             type='text'
//             value={childName}
//             onChange={(e) => setChildName(e.target.value)}
//           />
//         </div>
//         <button type='submit'>Add Chore</button>
//         <button type='button' onClick={onClose} style={{ marginLeft: '10px' }}>
//           Cancel
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddChoreForm;
