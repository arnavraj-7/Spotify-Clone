import { Server } from "socket.io";
import {Message} from "../models/message.model.js"

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  const userSockets = new Map(); // {clerkId:socketId}
  const userActivities = new Map(); //{clerkId:Activity}

  io.on("connection",async(socket)=>{
    console.log("socket connected",socket.id);
    const clerkId = socket.handshake.auth.clerkId;
    userSockets.set(clerkId,socket.id)
    userActivities.set(clerkId,"Idle");

    //check for undelivered messages in the database
    const undelivered = await Message.find({receiverId:clerkId,delivered:false});
    socket.emit("undelivered_messages",undelivered);
    //update them in database
    try{
      await Message.updateMany({receiverId:clerkId,delivered:false},{
       $set:{ delivered:true}
      })
    }catch(error){
      console.log("Error in updating messages",error);
    }

    //broadcast it to others to  update their frontend
    socket.broadcast.emit("user_connected",{clerkId,activity:"Idle"});

    //send list of online clients to new client
    socket.emit("online_users",Array.from(userSockets.keys()));

    //lsiten for activities
    socket.on("update_activity",async(payload)=>{
      const {clerkId,activity} = payload;
      userActivities.set(clerkId,activity);
      socket.broadcast.emit("update_activity",payload);
    })
     
    //send other clients' activities to the new client
    socket.emit("get_activities",Object.fromEntries(userActivities));

    //client send messages to server and then server sends to other clients
    socket.on("send_messages",async(payload)=>{
        const {senderId,receiverId,content} = payload;
        try{
          const new_message = await Message.create({senderId,receiverId,content,delivered:userSockets.has(receiverId)});
          if(userSockets.has(receiverId)){ //that means user is online
            io.to(userSockets.get(receiverId)).emit("receive_messages",new_message);
          }else{
            //it has been stored in the database now we will send it to client when he/she comes back online
          }
        }catch(error){
          console.log("Error in creating message",error);
        }

    })
    socket.on("disconnect",()=>{
      //remove his/her socket from map
      userSockets.delete(clerkId);
      userActivities.set(clerkId,"Offline");
      
      //broadcast to everyone that he/she is disconnected
      socket.broadcast.emit("user_disconnected",{clerkId,activity:"Offline"});
  
    }
    )
  })

};
