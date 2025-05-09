//updated path to reflect newly modularized MVC Pattern
const connect = require('./config/connect'); // module that handles connecting to mongodb
const express = require('express');
const cors = require('cors'); //cors allows frontend to talk to backend

//updated paths to reflect newly modularized MVC pattern 
const childRoutes = require('./routes/childRoutes');
const choreRoutes = require('./routes/choreRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

app.use(cors()); //allows requests from react frontend
app.use(express.json()); //parses incoming json data in request bodies

app.use("/children", childRoutes);
app.use("/chores", choreRoutes);
app.use("/users", userRoutes);

//connect to DB, then start server
async function startServer() {
  try {
    await connect.connectToServer();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    //added error.message
    console.error(`Failed to start server due to DB connection error.`, err.message);
  }
}
startServer();

// app.listen(PORT, () => {
//   connect.connectToServer();
//   console.log(`Server is running on port ${PORT}`);
// });
