const connectDB = require("./db/connectDB");
const restaurantSchema = require("./model/models");
const randomData = require("./randomData.json");
require("dotenv").config();

const start = async () => {
  try {
    connectDB();
    await restaurantSchema.deleteMany();
    await restaurantSchema.create(randomData);
    console.log("Added successfully");
  } catch (e) {
    console.log(e.message);
  }
};

start();
