const express = require("express");
const { createServer } = require("http");
const app = express();
const server = createServer(app);
const userModel = require("./models/userModel");
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log(" home ");
  res.json("home");
});

const ChatRouter = require("./routes/Chat");
const { Server } = require("socket.io");
app.use("/chat", ChatRouter);

const io = new Server(server);

io.on("connection", (socket) => {
  socket.emit(" hello ");
});

server.listen(3000, () => {
  console.log("everything's fine ");
});
