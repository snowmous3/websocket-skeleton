const socketio = require('socket.io');
let io;

module.exports = (server) => {
  if (!io) {
    io = socketio.listen(server);
  }
  return io;
};
