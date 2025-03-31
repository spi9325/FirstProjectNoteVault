import { Request, Response, Router } from "express"
import { tokenMiddleware } from "../middlewares/tokenMiddeleware";
import { PrismaClient } from "@prisma/client";
import { notesType } from "../zodTypes/types";
const client = new PrismaClient();
export const notesRoute = Router();

notesRoute.post("/create", tokenMiddleware, async (req: Request, res: Response) => {
    try {
        const parseData = notesType.safeParse(req.body);
        if (parseData.success) {
            const email = req.email;
            const { title, description } = parseData.data
            const userExistOrNot = await client.user.findFirst({
                where: {
                    email
                }
            })
            if (userExistOrNot) {
                const success = await client.$transaction(async (client:any) => {
                    const note = await client.notes.create({
                        data: {
                            title,
                            description,
                            userId: userExistOrNot.id
                        }
                    })
                    res.status(200).json({
                        message: "note Created",
                        note
                    })
                })
               
            } else {
                res.status(401).json({
                    error: "User Not Exist"
                })
            }
        } else {
            res.status(400).json({
                error: parseData.error
            })
        }

    } catch (error) {
        console.log(error);
    }
})

notesRoute.get("/all",tokenMiddleware,async(req: Request, res: Response)=>{
   try {
    const email = req.email;
    const userExistOrNot = await client.user.findFirst({
        where:{
            email
        }
    })
    if(userExistOrNot){
        const allNotes = await client.notes.findMany({
            where:{
                userId:userExistOrNot.id
            }
        })

        if(allNotes.length > 0){
            res.status(200).json(allNotes)
        }else{
            res.status(200).json([])
        }
    }else{
        res.status(401).json({
            error:"user not found"
        })
    }

   } catch (error) {
    console.error(error);
      res.status(500).json({ error: "Internal server error" });
   }
})

notesRoute.patch("/update",tokenMiddleware,async(req: Request, res: Response)=>{
   try {
    const id = req.userid
    const parseData = notesType.safeParse(req.body);
    if(!parseData.success){
        res.json({
            error:parseData.error
        })
        return
    }
    const noteNo = parseData.data?.noteNo
    const {title,description} = parseData.data!;
    if(id){
        if(noteNo){
            
                const updatedNote = await client.notes.update({
                    where:{
                        noteNo
                    },
                    data:{
                        title,
                        description
                    }
                    
                })
                if(updatedNote){
                    res.status(200).json({
                        updatedNote,
                        msg:"Note Updated successfully"
                    })
                }
            
        }else{
            res.status(400).json({
                error:"provide valid note No"
            })
        }
        
    }
   } catch (error) {
        console.log(error);
   }
})

notesRoute.delete("/delete",tokenMiddleware,async(req: Request, res: Response)=>{
    try{
        const id = req.userid;
        const noteNo = Number(req.query.noteNo);
         
        if(!noteNo){
            res.status(404).json({
                error:"note no not provided"
            })
            return
        }
        if(id){
          
            const transaction = await client.$transaction(async(client:any)=>{
                const deletedNote = await client.notes.delete({
                    where:{
                        noteNo,
                        userId:id
                    }
                })
                if(deletedNote){
                    res.status(200).json({
                        message:"deletion success"
                    })
                }else{
                    res.status(404).json({
                        error:"deletion fail"
                    })
                }
            })
        }
    }catch(error){
        console.log(error)
    }   
})

notesRoute.post("/view",tokenMiddleware,async(req: Request, res: Response)=>{
    try {
        const noteNo = Number(req.query.noteNo);
        const userId = Number(req.userid);
    
        const note =  await client.notes.findFirst({
            where:{
                noteNo,
                userId
            }
        });
        if(note){
            res.status(200).json(note);
        }else{
            res.status(404).json("not found")
        }
        
        
    } catch (error) {
        console.log(error);
    }
})

