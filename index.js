const User = require('./models/User')
const UserCounter = require('./models/UserCounter')
const express = require('express');
const app = express();
const path = require('path');
const port =  5000;
const mongoDB = require('./db')
require('dotenv').config();
// const BASE_URL = process.env.BASE_URL

mongoDB();
app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//as we have to make multiple use for login signup and many more
app.use('/api', require('./Routes/UserManagement'));
app.use('/api', require('./Routes/DiseaseManagement'));
app.use('/api', require('./Routes/QuestionManagement'));
app.use('/api', require('./Routes/ProfileManagement'));
app.use('/api', require('./Routes/ComplaintManagement'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

});