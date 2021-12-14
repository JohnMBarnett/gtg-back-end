const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/users/user-router");
const eventRouter = require("./routes/events/events-router");
const authRouter = require("../api/routes/auth/auth-router");

const server = express();
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);
server.use("/api/events", eventRouter);

module.exports = server;
