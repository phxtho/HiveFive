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
                sender: 'C#',
                content: ''
            }
        ]
    },
    {
        id: 'Java',
        messages: [
            {
                sender: 'Java',
                content: ''
            }
        ]
    },
    {
        id: 'Web',
        messages: [
            {
                sender: 'Web',
                content: ''
            }
        ]
    },
    {
        id: 'Design',
        messages: [
            {
                sender: 'Design',
                content: ''
            }
        ]
    },
    {
        id: 'Git',
        messages: [
            {
                sender: 'Git',
                content: ''
            }
        ]
    }
];

// Maps a room name to its index in an array
function findIndexByID(id) {
    let index = 0;
    for (const iterator of rooms) {
        if (iterator.id === id) {
            return index;
        }
        index += 1;
    }
}

// When client connects to server fire this call back
io.on('connection', socket => {
    
    let currentRoomName = rooms[0].id;
    
    const safeJoin = newRoomName => {
        socket.leave(currentRoomName);
        socket.join(newRoomName, () => console.log(`Socket ${socket.id} joined room ${newRoomName}`));
        currentRoomName = newRoomName;
    }

    socket.on('join-room', roomName => {
        safeJoin(roomName);

        let roomIndex = findIndexByID(roomName);

        socket.emit('room', rooms[roomIndex]);
    });

    socket.on('new-message', (data) => {
        console.log(socket.id + ' sent a message to '+ data.roomId);
        
        // Mapping a room name to a position in room array
        let index = findIndexByID(data.roomId);

        // Store message history
        rooms[index].messages.push(data.message);

        // Post message to the rest of the sockets in room
        io.to(data.roomId).emit('new-message', data.message);
    });

    socket.on('typing', (data) => {
        socket.to(data.roomId).broadcast.emit('typing', data.typingInfo);
    });

    io.emit('rooms', rooms);

    console.log(`Socket ${socket.id} has connected`);
    safeJoin(currentRoomName);
});

http.listen(4444, () => {
    console.log('Listening on port 4444');
});