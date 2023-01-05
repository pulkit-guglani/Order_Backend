const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.send("Hello home page");
});

app.get("about", (req, res) => {
  res.send("This is about page");
});

app.all("*", (req, res) => {
  res.status(404).send("Resource not found");
});

app.listen(PORT, () => {
  console.log("server started");
});
