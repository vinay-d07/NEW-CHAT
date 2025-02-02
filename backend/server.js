const express = require("express");
const { createServer } = require("http");
const app = express();
const server = createServer(app);
const userModel = require("./models/userModel");
const cors = require('cors');
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    console.log(" home ");
    res.json("home")
});

const ChatRouter = require("./routes/Chat");
app.use("/chat", ChatRouter);

server.listen(3000, () => {
  console.log("everything's fine ");
});
