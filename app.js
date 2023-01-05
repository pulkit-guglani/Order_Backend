const express = require("express");
const app = express();
const path = require("path");

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.sendFile(
    path.resolve(
      __dirname,
      "./nodeSetupFiles/node-express-course/02-express-tutorial/navbar-app/index.html"
    )
  );
});

app.get("about", (req, res) => {
  res.send("This is about page");
});

app.all("*", (req, res) => {
  res.status(404).send("Resource not found");
});

app.listen(5000, () => {
  console.log("server started");
});
