const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = 4001;

const app = express();

const server = http.createServer(app);

const io = socketIO(server);

let userCount = 1;

io.on('connection', socket => {
    userCount++;

    const username = `Guest ${userCount}`;

    socket.emit('SET_USERNAME', username);
    io.sockets.emit('CREATE_MESSAGE', {
        content: `${username} connected`
    });

    socket.on('SEND_MESSAGE', (messageObject) => {
        io.sockets.emit('CREATE_MESSAGE', messageObject);
    });

    socket.on('disconnected', () => {
        io.sockets.emit('CREATE_MESSAGE', {
            content: `${username} disconnected`
        })
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));