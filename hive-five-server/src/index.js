// App setup
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const cors = require('cors');
const staticRoot = __dirname + '/';

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
            },
            {
                sender: 'Phatho',
                content: 'FOETSEK!'
            },
            {
                sender: 'Ninjakjshwang',
                content: 'Yeet!'
            },
            {
                sender: 'Phatho',
                content: 'FOETSEK!'
            },
            {
                sender: 'Ninjashwang',
                content: 'Yeet!'
            },
            {
                sender: 'Phatho',
                content: 'FOETSEK!'
            },
            {
                sender: 'Ninjashwang',
                content: 'Yeet!'
            },
            {
                sender: 'Phatho',
                content: 'FOETSEK!'
            },
            {
                sender: 'Ninjashwang',
                content: 'Yeet!'
            },
            {
                sender: 'Phatho',
                content: 'FOETSEK!'
            },
            {
                sender: 'Ninjashwang',
                content: 'Yeet!'
            },
            {
                sender: 'Phatho',
                content: 'FOETSEK!'
            },
            {
                sender: 'Ninjashwang',
                content: 'Yeet!'
            },
            {
                sender: 'Phatho',
                content: 'FOETSEK!'
            },
            {
                sender: 'Ninjashwang',
                content: 'Yeet!'
            },
            {
                sender: 'Phatho',
                content: 'FOETSEK!'
            }
        ]
    },
    {
        id: 'Java',
        messages: [
            {
                sender: 'Ninjashwang',
                content: 'Yeet!'
            },
            {
                sender: 'Phatho',
                content: 'FOETSEK!'
            }
        ]
    },
    {
        id: 'Web',
        messages: [
            {
                sender: 'Ninjashwang',
                content: 'Yeet!'
            },
            {
                sender: 'Phatho',
                content: 'FOETSEK!'
            }
        ]
    },
    {
        id: 'Design',
        messages: [
            {
                sender: 'Ninjashwang',
                content: 'Yeet!'
            },
            {
                sender: 'Phatho',
                content: 'FOETSEK!'
            }
        ]
    },
    {
        id: 'Git',
        messages: [
            {
                sender: 'Ninjashwang',
                content: 'Yeet!'
            },
            {
                sender: 'Phatho',
                content: 'FOETSEK!'
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


app.use(function(req, res, next) {
    //if the request is not html then move along
    var accept = req.accepts('html', 'json', 'xml');
    if (accept !== 'html') {
        return next();
    }

    // if the request has a '.' assume that it's for a file, move along
    var ext = path.extname(req.path);
    if (ext !== '') {
        return next();
    }

    fs.createReadStream(staticRoot + 'index.html').pipe(res);

});

app.use(cors());
app.use(express.static(staticRoot));
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
        console.log(data);
        let index = findIndexByID(data.roomId);
        // Store message history
        rooms[index].messages.push(data.message);
        // Post message to the rest of the room
        socket.to(data.roomId).emit('new-message', data.message);
        io.emit('rooms', rooms);
    });

    socket.on('typing', (data) => {
        socket.to(data.roomId).broadcast.emit('typing', data.typingInfo);
    });

    io.emit('rooms', rooms);
    io.emit('room', rooms[0]);

    socket.join(rooms[0], () => console.log(`Socket ${socket.id} joined room C#`));

    console.log(`Socket ${socket.id} has connected`);
});

http.listen(4444, () => {
    console.log('Listening on port 4444');
});