const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: "*",
});

io.on("connection", (socket) => {
  socket.on("sendmsgtoserver", (data) => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;

    io.emit("sendmsgtoclient", {
      content: data,
      sender: socket.id,
      time: dateTime,
    });
  });
});

const port = 4000;
server.listen(port, () => {
  console.log("listening on", 4000);
});
