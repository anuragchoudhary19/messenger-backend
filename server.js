const dotenv = require('dotenv');
dotenv.config();

// socket io
const io = require('socket.io')(process.env.PORT || 8000);
io.on('connection', (socket) => {
  socket.on('online', (id) => {
    io.emit('online', id);
  });
  socket.on('typing', (senderId, recieverId) => {
    socket.broadcast.emit('typing', senderId, recieverId);
  });
  socket.on('notTyping', (senderId, recieverId) => {
    socket.broadcast.emit('notTyping', senderId, recieverId);
  });
  socket.on('disconnect', () => {
    io.emit('offline', socket.handshake.query.id);
  });
});
