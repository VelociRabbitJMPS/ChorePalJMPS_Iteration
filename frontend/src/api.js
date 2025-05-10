
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // or your deployed backend URL

// Get image from S3 bucket using filename stored in MongoDB
export const fetchChoreImage = async (filename) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/images/${filename}`);
    console.log('Image fetch response:', response.data);
    return response.data; // base64 image string
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
};
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:3000'; // Update if using a deployed backend

// // Get base64 image string from S3 using filename
// export const fetchChoreImage = async (filename) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/images/${filename}`);
//     console.log('Image fetch response:', response.data);
//     return response.data.imageSource; // return just the base64 string
//   } catch (error) {
//     console.error('Error fetching image:', error);
//     return null;
//   }
// };

// // Upload an image file to S3
// export const uploadChoreImage = async (file) => {
//   try {
//     const formData = new FormData();
//     formData.append('image', file);

//     await axios.post(`${API_BASE_URL}/images`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     return file.name; // Return the filename to store in MongoDB
//   } catch (error) {
//     console.error('Image upload failed:', error);
//     throw error;
//   }
// };
