// App setup
const app = require('express')();

// App Server setup
const http = require('http').Server(app);

// Socket setup
const io = require('socket.io')(http);

// In memory storage of our rooms and their message histories
let rooms = [
    {
        id: 'C#',
        messages: [
            {
                sender: 'Ninjashwang',
                content: 'Yeet!'
            }
        ]
    },
    {
        id: 'Java',
        messages: [
            {
                sender: 'Ninjashwang',
                content: 'Yeet!'
            }
        ]
    },
    {
        id: 'Web',
        messages: [
            {
                sender: 'Ninjashwang',
                content: 'Yeet!'
            }
        ]
    },
    {
        id: 'Design',
        messages: [
            {
                sender: 'Ninjashwang',
                content: 'Yeet!'
            }
        ]
    },
    {
        id: 'Git',
        messages: [
            {
                sender: 'Ninjashwang',
                content: 'Yeet!'
            }
        ]
    }
];

// When client connects to server fire this call back
io.on('connection', socket => {

    let previousRoomId;
    const safeJoin = currentRoomId => {
        socket.leave(previousRoomId);
        socket.join(currentRoomId, () => console.log(`Socket ${socket.id} joined room ${currentRoomId}`));
        previousRoomId = currentRoomId;
    }

    socket.on('getRoom', roomId => {
        safeJoin(roomId);
        socket.emit('room', rooms[roomId]);
    });

    socket.on('addRoom', room => {
        rooms[room.id] = room;
        safeJoin(room.id);
        io.emit('rooms', Object.keys(rooms));
        socket.emit('room', room);
    });

    socket.on('new-message', (data) => {
        // Store message history
        rooms[data.roomId].messages.push(data.message);
        // Post message to the rest of the room
        socket.to(data.roomId).emit('new-message', data.message);
    });

    socket.on('typing', (data) => {
        socket.to(data.roomId).broadcast.emit('typing', data.typingInfo);
    });

    io.emit('rooms', rooms);

    console.log(`Socket ${socket.id} has connected`);
});

http.listen(4444, () => {
    console.log('Listening on port 4444');
});