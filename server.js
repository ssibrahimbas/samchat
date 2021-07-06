const express = require("express");
const dotenv = require("dotenv");
const routers = require("./routers");
const path = require("path");
const {connectDatabase} = require("./helpers/database/connectDatabase");
const {
    customErrorHandler,
} = require("./middlewares/errors/customErrorHandler");
const {staticFiles} = require('./middlewares/static/router')
dotenv.config({
    path: "./config/env/config.env",
});

const mainSpace = require("./socket/namespaces/main");
const roomSpace = require("./socket/namespaces/room");

// MongoDB Connection
connectDatabase();

const app = express();

app.use(express.json());
app.use(staticFiles);
app.use("/", routers);
app.use(customErrorHandler);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
    console.log(`App started on ${PORT} : ${process.env.NODE_ENV}`);
});

const io = require(`socket.io`)(server);
const main = io.of('/');
const rooms = io.of('/rooms');
main.on('connection', (socket) => mainSpace(socket, io))
rooms.on('connection', (socket) => roomSpace(socket, io))