const express = require('express');
const socketio = require("socket.io");
const cors = require('cors');
const http = require("http");

const routes = require('./routes');
const database = require('./config/database');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: '*',
  }
});

io.on("connection", (socket) => {
  console.log("Usuário conectado: ", socket.id);

  socket.on("disconnect", () => {
    console.log(`Usuário desconectado: ${socket.id}`)
  });
});

app.use((request, response, next) => {
  request.io = io;

  return next();
});

database.connect();

app.use(express.json());
app.use(cors());
app.use(routes);

server.listen(6677);