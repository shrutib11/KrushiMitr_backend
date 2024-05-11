const mongoose = require('mongoose');                   //for creating database with schema mongoose is used
const mongoURI = 'mongodb+srv://meetmboda2310:Meet%405662@cluster0.vlfphl3.mongodb.net/?retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
      await mongoose.connect(mongoURI);
  
      console.log('Connected');
      
      const db = await mongoose.connection; // Get the connection object
    
    } catch (err) {
      console.error('Error:', err);
    }
  }
  
  module.exports = mongoDB;