import { Request, Response, Router } from "express";
import { tokenMiddleware } from "../middlewares/tokenMiddeleware";
import { addMessageType, RoomType } from "../zodTypes/chatTypes";
import { PrismaClient } from "@prisma/client";
import NodeCache from "node-cache";

const client = new PrismaClient()
export const roomRoutes = Router();
const nodeCache = new NodeCache();

roomRoutes.post("/create", tokenMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
        const parseData = RoomType.safeParse(req.body);
        if (!parseData.success) {
            res.status(400).json({ error: "Invalid data format" });
            return
        }
        const { roomName } = parseData.data;
        if (!req.email || !req.userid) {
            res.json({
                error: "user Not Found pls signup"
            });
            return
        }

        const roomExist = await client.room.findFirst({
            where: {
                roomName,
                ownerId: req.userid
            }
        })

        if (!roomExist) {
            const note = await client.room.create({
                data: {
                    roomName,
                    ownerId: req.userid
                }
            })
            nodeCache.del("rooms");
            res.status(200).json({ message: "success room created" })
        }
    } catch (error) {
        console.log(error)
    }
})

roomRoutes.post("/join", tokenMiddleware, async (req: Request, res: Response) => {
    const parseData = RoomType.safeParse(req.body);
    if (!parseData.success) {
        res.status(400).json({ error: "Invalid input. Name should contain only alphabets." });
    }

    const { roomName } = parseData.data!;
    if(!roomName){
        res.json({error:"provide room name"})
        return
    }
    const userId = req.userid!;

    try {
        const room = await client.room.findUnique({
            where: { roomName },
            select: { id: true }
        });

        if (!room) {
            res.status(404).json({ error: "Room not found." });
            return
        }
        const joinRoom = await client.roomMember.upsert({
            where: {
                userId_roomId: {
                    userId,
                    roomId: room?.id
                }
            },
            update: {},
            create: {
                userId,
                roomId: room?.id
            }
        });
        nodeCache.del("allRooms")
        res.status(201).json({ message: "User joined the room successfully", joinRoom });

    } catch (error:any) {
        res.status(500).send(error.response.data.error);
    }
});

roomRoutes.get("/all", tokenMiddleware, async (req: Request, res: Response) => {
       const rooms = await client.room.findMany({
           where: {
               ownerId: Number(req.userid)
           }
       })
    if(rooms) {
        res.status(200).json({
            rooms,
            userId:Number(req.userid)
        })
    }
});

roomRoutes.post("/messages", tokenMiddleware, async (req: Request, res: Response) => {
    try {
        const parseData = RoomType.safeParse(req.body);
        const { roomName } = parseData.data!;
        if(!roomName){
            res.json({
                error:"provide roomName"
            })
            return
        }
        if (!parseData.success) {
            res.send("invalid input");
            return
        }
        const roomExist = await client.room.findFirst({
            where: {
                roomName
            }
        });
        if (roomExist) {
            const messages = await client.message.findMany({
                where: {
                    roomId: roomExist.id
                },
            
            });
            if (messages) {
                res.status(200).json({
                    messages
                });
            }
        } else {
            res.json({
                error: "room not Exist"
            })
        }
    } catch (error) {
        console.log(error);
    }
});

roomRoutes.get("/joinrooms",tokenMiddleware,async(req:Request,res:Response)=>{
   try {
        const allRooms = await client.roomMember.findMany({
           where:{userId:req.userid},
           include:{
               room:{
                   select:{roomName:true}
               }
           }
        })
    
     if(allRooms){
         res.status(200).json({ 
            allRooms,
            userId:req.userid
          });
     }
   } catch (error) {
    console.log(error)
   }
})

roomRoutes.post("/addmessage",tokenMiddleware,async (req:Request,res:Response)=>{
    try {
        const parseData = addMessageType.safeParse(req.body);
        if(!parseData.success){
            res.json({error:"invalid Input"});
            return
        }
        const {roomId,content} = parseData.data;
    
        if(!roomId || !content){
            res.json({error:"provide valid roomName"});
            return
        }

        if(roomId){
            const addmessage = await client.message.create({
                data:{
                    content,
                    senderId:req.userid!,
                    roomId:Number(roomId)
                }
            })
            res.json({addmessage});
        }
    } catch (error) {
        console.log(error);
    }
})