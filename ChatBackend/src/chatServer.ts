import WebSocket, { WebSocketServer } from "ws";
import dotenv from "dotenv";
import job from "./config/cron";

dotenv.config();
interface User{
    socket:WebSocket;
    roomName:String;
}

const wss = new WebSocketServer({ port: Number(process.env.PORT) });    
const allSockets:User[] = [];
if(process.env.NODE_ENV == "production") job.start();
wss.on("connection", (socket) => {
try {
    socket.on("message", async(message) => {
        const parseMessage = JSON.parse(message.toString());
        if(parseMessage.type == "create"){
            const findUser = allSockets.find((x)=>x.socket == socket);
            if(!findUser){
                allSockets.push({
                    socket,
                    roomName:parseMessage.payload.roomName
                })
                console.log("room created")
            }
        }

        if(parseMessage.type == "join"){
            const findUser = allSockets.find((x)=>x.socket == socket);
            if(!findUser){
                allSockets.push({
                    socket,
                    roomName:parseMessage.payload.roomName,
                });
                console.log("userJoined");
            }
        }

        if(parseMessage.type=="chat"){
            const currentUserRoom = allSockets.find((x)=> x.socket == socket)!;
            
            for(let i=0; i<allSockets.length; i++){
                if(allSockets[i].roomName == currentUserRoom.roomName){
                    allSockets[i].socket.send(JSON.stringify({
                        type:"chat",
                        payload:{
                            senderId:parseMessage.payload.senderId,
                            roomId:parseMessage.payload.roomId,
                            content:parseMessage.payload.content
                        }
                    }));
                }
            }
        }
        
    
    });
} catch (error) {
    console.log(error);
}
        socket.on("close", () => {
                console.log("Friend left.");
            });
});
console.log("wss running on PORT:",process.env.PORT);
