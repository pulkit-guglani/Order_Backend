const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.MONGO_URL;

const connectDb = () => {
  console.log("URI: " + process.env.MONGO_URL);
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDb;
