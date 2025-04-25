const connect = require('./connect');// module that handles connecting to mongodb
const express = require('express');
const cors = require('cors');  //cors allows frontend to talk to backend

const app = express(); 
const PORT = 3000;

app.use(cors()); //allows requests from react frontend
app.use(express.json());

//connect to DB, then start server
async function startServer() {
  try {
    await connect.connectToServer();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error(`Failed to start server due to DB connection error.`);
  }
}
startServer();

// app.listen(PORT, () => {
//   connect.connectToServer();
//   console.log(`Server is running on port ${PORT}`);
// });
