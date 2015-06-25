var socketio = require('socket.io');

function io(server) {
    var io = socketio.listen(server);

    /*io.on('connection', function (socket) {
      socket.on('chat message', function(msg) {
        console.log('MESSAGE: ', msg);
        io.emit('chat message', msg);
      });
      socket.on('map message', function(msg) {
        console.log('MESSAGE: ', msg);
        io.emit('map message', msg);
      });
    });*/

    var store = {};

    io.on('connection', function (socket) {
      socket.on('join', function(msg) {
        console.log('MESSAGE: ', msg);
        usrobj = {
          'room': msg.roomid,
          'name': msg.name
        };
        store[msg.id] = usrobj;
        socket.join(msg.roomid);
        //socket.join(socket.id);
        //io.emit('join', msg);
      });

      socket.on('chat message', function(msg) {
        console.log('MESSAGE: ', msg);
        console.log('ROOM: ', store[msg.id].room);
        io.to(store[msg.id].room).emit('chat message', msg);
      });
      socket.on('map message', function(msg) {
        console.log('MESSAGE: ', msg);
        console.log('ROOM: ', store[msg.id].room);
        io.to(store[msg.id].room).emit('map message', msg);
      });

      /*socket.on('disconnect', function() {
        socket.leave(roomid);
        io.to(roomid).emit('chat message', {
          id: id,
          name: name,
          text: '退出しました！'
        });
      });*/
    });
}

module.exports = io;
