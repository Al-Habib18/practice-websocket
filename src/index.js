/** @format */

const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const app = express();

app.use(express.static(path.join(__dirname, "../public")));

const httpServer = http.createServer(app);

// Socket connection
const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("Socket Server connected");

    socket.on("message", (data) => {
        socket.broadcast.emit("send-message", data);
    });

    socket.on("activity", (name) => {
        socket.broadcast.emit("send-activity", name);
    });

    io.on("disconnect", () => {
        console.log("Socket Server disconnected");
    });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/index.html"));
});

app.get("/chat", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/chat.html"));
});

httpServer.listen(4000, () => {
    console.log("server listening on 4000 port");
});
