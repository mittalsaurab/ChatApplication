const io = require('socket.io')(8000,{
    cors: {
      origin: "http://127.0.0.1:8080",
      methods: ["GET", "POST"]
    }
  }); 

const users = {};

io.on("connection", socket =>{
    // console.log("Socket object ", socket) ;
    
    socket.on("new-user-joined", name =>{
        users[socket.id] = name ; 
        console.log("new-user-joined : ", name);
        socket.broadcast.emit("user-joined", name);
    }); 

    socket.on("receive", ({message, name})=>{
        console.log(`user ${name} set message : ${message}`);
        socket.broadcast.emit("receive", {'message': message, 'name' : name});
    });
  
    socket.on("disconnect", ()=>{
        socket.broadcast.emit("left", `${users[socket.id]} left`);
    });

})