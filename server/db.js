const mongoose = require("mongoose");
require("dotenv").config();
// Define your MongoDB connection URL
const mongoURL = process.env.MONGODB_URL;

// Create a Mongoose connection
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Export the Mongoose connection
module.exports = mongoose.connection;
