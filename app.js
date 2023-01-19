const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;
const route = require("./routes/routes");
const connectDB = require("./db/connectDb");
var cors = require("cors");
app.use(cors());
app.use(express.json());
try {
  connectDB();
} catch (e) {
  console.log(e.message);
}
app.use("/api", route);
app.get("/about", (req, res) => {
  res.send("This is about page");
});

app.all("*", (req, res) => {
  res.status(404).send("Resource not found");
});

app.listen(PORT, () => {
  console.log("server started");
});
