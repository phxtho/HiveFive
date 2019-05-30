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

function findIndexByID(id) {
    let index = 0;
    for (const iterator of rooms) {
        //console.log(iterator.id);
        //console.log(id);
        if (iterator.id === id) {
            return index;
        }
        index += 1;
    }
    //console.log("WTF");
}

// When client connects to server fire this call back
io.on('connection', socket => {
    
    console.log(`on connect:`);
    console.log(socket.adapter.rooms)

    const safeJoin = currentRoomId => {
        //socket.leave(previousRoomId);
        socket.leaveAll();
        //socket.adapter.add(socket.id, currentRoomId, () => console.log("this worked!"));
        // console.log(`in safe join`);
        // console.log(socket.adapter.rooms)
        
        socket.join(currentRoomId, () => {
            // console.log(`Socket ${socket.id} joined room ${currentRoomId}`);
            // console.log(`in socketjoin`);
            // console.log(socket.adapter.rooms)
        });
        previousRoomId = currentRoomId;
    }

    socket.on('getRoom', roomId => {
        safeJoin(roomId);
        socket.emit('room', rooms[roomId]);
        io.emit('rooms', rooms);
    });

    socket.on('send-message', (data) => {
        console.log(data);
        let index = findIndexByID(data.roomId);
        // Store message history
        rooms[index].messages.push(data.message);
        // Post message to the rest of the room
        // console.log('data.message:')
        // console.log(data.message);
      
        io.to(data.roomId).emit('new-message', data.message);
        socket.join(data.roomId);
        console.log(io.sockets.adapter.rooms[data.roomId]);
        //io.emit('new-message',data.message);
        //io.emit('rooms', rooms);
    });

    socket.on('typing', (data) => {
        socket.to(data.roomId).broadcast.emit('typing', data.typingInfo);
    });

    io.emit('rooms', rooms);
    io.emit('room', rooms[0]);

    console.log(`Socket ${socket.id} has connected`);
});

http.listen(4444, () => {
    console.log('Listening on port 4444');
});