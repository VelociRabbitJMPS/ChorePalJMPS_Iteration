const express = require('express');
const multer = require('multer');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
require('dotenv').config();

const awsRoutes = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const s3Bucket = 'ptangatuestorage';
const s3Client = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});


// 🖼️ Retrieve image from S3 and return base64
awsRoutes.get('/images/:filename', async (req, res) => {
  const filename = req.params.filename;

  const params = {
    Bucket: s3Bucket,
    Key: filename,
  };

  try {
    const data = await s3Client.send(new GetObjectCommand(params));
    const buffer = await data.Body.transformToString('base64');
    const contentType = data.ContentType;
    const imageSource = `data:${contentType};base64,${buffer}`;
    res.json({ imageSource });
  } catch (err) {
    console.error('Error fetching image from S3:', err);
    res.status(500).json({ error: 'Failed to retrieve image' });
  }
});

module.exports = awsRoutes;

// // 📤 Upload image to S3 and create a chore document
// awsRoutes.post('/upload-chore', upload.single('image'), async (req, res) => {
//   try {
//     const db = req.app.locals.db; // ✅ Access db from app.locals
//     let imageFilename = null;

//     if (req.file) {
//       const ext = path.extname(req.file.originalname);
//       imageFilename = `${uuidv4()}${ext}`;

//       const uploadParams = {
//         Bucket: s3Bucket,
//         Key: imageFilename,
//         Body: req.file.buffer,
//         ContentType: req.file.mimetype,
//       };

//       await s3Client.send(new PutObjectCommand(uploadParams));
//     }

//     const newChore = {
//       choreName: req.body.choreName,
//       childName: req.body.childName,
//       day: req.body.day,
//       isWeekly: req.body.isWeekly === 'true',
//       isCompleted: req.body.isCompleted === 'true',
//       rating: req.body.rating || null,
//       image: imageFilename,
//       status: 'Pending',
//     };

//     const result = await db.collection('chores').insertOne(newChore);
//     res.status(201).json({ ...newChore, _id: result.insertedId });
//   } catch (err) {
//     console.error('Upload chore failed:', err);
//     res.status(500).json({ error: 'Failed to upload chore', details: err.message });
//   }
// });



