const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/reelPro");
    console.log("databse connection is successfull");
  } catch (error) {
    console.log("Database connection failed");
  }
};

module.exports = connect;