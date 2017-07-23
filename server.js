const config = require('./webpack.config.js');

const webpack = require('webpack');

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const compiler = webpack(config);

let users = [];

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


io.on('connection', (socket) => {

    users.push(socket.id);

    if (io.engine.clientsCount < 2) {
        io.to(socket.id).emit('hey', 1);

    }
    else if (io.engine.clientsCount === 2) {
        // tell first user he is first in case he was second and opponent disconnected
        io.to(users[0]).emit('hey', 1);
        //two users in, can start game
        io.emit('play');

    }

    socket.on('move', (board) => {// broadcast to second player the board after move
        socket.broadcast.emit('getBoard', board);

    });

    socket.on('win', (board) => { // broadcast to second player that he lost
        socket.broadcast.emit('lost', board);


    });

    socket.on('playAgain', (board) => { // start another game
        socket.broadcast.emit('playAgain', board);


    });

    socket.on('disconnect', () => {
        users.splice(users.indexOf(socket.id), 1); // in case of disconnect
        io.emit('disconnected', 'disconnected');

    });
});


http.listen(3000, function () {
    console.log('listening on *:3000');
});

