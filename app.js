const express= require('express');
const cors = require('cors');
const userRouter=require('./routes/userRoutes')
const messageRouter=require('./routes/messageRoutes')
const socket=require('socket.io');

const app= express();
require("dotenv").config();

app.use(cors());
app.use(express.json());


const connected = require("./connection.js");
connected 
.then(()=>{
    console.log("Connected to database successfully!");
    app.set('port',process.env.PORT||8080);
    const server = app.listen(app.settings.port, ()=>console.log(`Listening on port ${process.env.PORT}`));
    const io=socket(server,{
        cors:{
            origin:"http://localhost:3000",
            credentials:true,
        }
    
    })
    global.onlineUsers=new Map();
    io.on("connection",(socket)=>{
        global.chatSocket=socket;
        socket.on("add-user",(userId)=>{

            onlineUsers.set(userId,socket.id);
        });
        socket.on("send-msg",(data)=>{
            const sendUserSocket=onlineUsers.get(data.to);
            if(sendUserSocket){
                socket.to(sendUserSocket).emit("msg-recieve",data.message);
            }
        })
    })
    
}).catch(err=>{
    console.log(err.message);
})

app.use('/api/auth',userRouter);
app.use('/api/messages',messageRouter);

