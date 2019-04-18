const express = require('express');
const app = express();
const PORT = 3000;

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

io.on('connection', (socket) => {
  console.log('new connection created');
  socket.on('intro', data => {
    console.log('intro by', data);
  })
  socket.on('changingSlide', data => {
    console.log('changing slide to:', data);
    io.emit('setSlide', data);
  })
})

http.listen(PORT, () => {
  console.log(`running on port:${PORT}`);
})