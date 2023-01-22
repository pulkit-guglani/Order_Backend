const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;
const route = require("./routes/routes");
const connectDb = require("./db/connectDb.js");
const http = require("http");
var cors = require("cors");
var server = http.Server(app);
const io = require("socket.io")(server, { cors: { origin: "*" } }).of("/api");

app.use(cors());
app.use(express.json());
try {
  connectDb();
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

server.listen(PORT, () => {
  console.log("server started");
});

// app.listen(PORT, () => {
//   console.log("server started");
// });

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("orderAdded", (message) => {
    console.log("SOCKET: New order added");
    socket.broadcast.emit("updateOrders");
  });
});
