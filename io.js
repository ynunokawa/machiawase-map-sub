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

    io.on('connection', function (socket) {
      socket.on('join', function(msg) {
        console.log('MESSAGE: ', msg);
        socket.set('room': msg.roomid);
        socket.set('name': msg.name);
        socket.set('id': msg.id);
        socket.join(msg.roomid);
        roomid = msg.roomid;
        //io.emit('join', msg);
      });

      socket.on('chat message', function(msg) {
        var roomid;
        console.log('MESSAGE: ', msg);
        socket.get('room', function(err, _room) {
          roomid = _room;
        });
        io.to(roomid).emit('chat message', msg);
      });
      socket.on('map message', function(msg) {
        var roomid;
        console.log('MESSAGE: ', msg);
        socket.get('room', function(err, _room) {
          roomid = _room;
        });
        io.to(roomid).emit('map message', msg);
      });

      socket.on('disconnect', function() {
        var roomid, name, id;
        socket.get('room', function(err, _room) {
          roomid = _room;
        });
        socket.get('name', function(err, _name) {
          name = _name;
        });
        socket.get('id', function(err, _id) {
          id = _id;
        });
        socket.leave(roomid);
        io.to(roomid).emit('chat message', {
          id: id,
          name: name,
          text: '退出しました！'
        });
      })
    });
}

module.exports = io;
