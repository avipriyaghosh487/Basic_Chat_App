const express = require('express')
const { createServer } = require('http')
const {join} = require('path')
const {Server} = require('socket.io')

const app = express();
const server = createServer(app);
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(join(__dirname,'index.html'));
  console.log(__dirname)
});

io.on('connection', (socket) => {
    console.log('Connected to a user')

    //On chat message
    socket.on('chat message', (msg) => {
        //console.log('Chat Message: '+ msg)
        io.emit('chat message',msg)
    })

    //Disconnection
    /*socket.on('disconnect', () => {
        console.log('User disconnected')
    })*/
})

server.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});