const mongoose = require('mongoose');

// Database connection function
const connectDB = async () => {
  try {
    // MongoDB connection string
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wellness-tracker';
    
    // Connect to MongoDB
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;