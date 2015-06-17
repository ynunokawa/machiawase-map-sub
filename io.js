var socketio = require('socket.io');

function io(server) {
    var io = socketio.listen(server);

    io.on('connection', function (socket) {
      socket.on('chat message', function(msg) {
        console.log('MESSAGE: ', msg);
        io.emit('chat message', msg);
      });
      socket.on('map message', function(msg) {
        console.log('MESSAGE: ', msg);
        io.emit('map message', msg);
      });
    });
}

module.exports = io;
