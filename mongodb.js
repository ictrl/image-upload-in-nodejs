const mongoose = require("mongoose");
const url = "your_mongodb_url";

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log("Mongo connected");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
