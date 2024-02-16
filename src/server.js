const app=require("express")()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})
io.on('connection', (socket) => { //listening
    console.log('a user connected',socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected',socket.id);
      });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('server',msg)
      });
  });

server.listen(3000)