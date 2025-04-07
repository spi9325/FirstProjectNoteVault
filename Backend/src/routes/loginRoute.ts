import { PrismaClient } from "@prisma/client";
import router from "express"
import { Request,Response } from "express"
import { userTypes } from "../zodTypes/types";
import jwt from "jsonwebtoken"
const jwtSecret: string = process.env.JWT_SECRET as string;
import bcrypt from "bcrypt"
import { tokenMiddleware } from "../middlewares/tokenMiddeleware";
export const loginRoute = router();
const client = new PrismaClient();

loginRoute.post("/signup",async (req:Request,res:Response)=>{
    try {
       const parseData = userTypes.safeParse(req.body);
       
       if(!parseData.success){
           res.status(400).json({
               error:parseData.error
            })
       }else{
        const username=parseData.data?.username
        const email=parseData.data?.email!
        const password=parseData.data?.password!;       
 
        const securePassword= await bcrypt.hash(password,5);
 
        const userExistOrNot = await client.user.findFirst({
         where:{
             email
         }
        });
        
        if(!userExistOrNot){
         const transaction = await client.$transaction(async (client:any)=>{
             await client.user.create({
                data:{
                 username,
                 email,
                 password:securePassword
                }
             })
         })
 
         res.status(200).json({
             message:"SignUp success"
         })
        }
        else{
         res.status(409).json(
             {
                 error:"user alrady exist"
             }
         )
        }
       }
  
   } catch (error) {
    console.log(error);
       
   }
});

loginRoute.post("/signin",async(req:Request,res:Response)=>{
    try {
        const parseData = userTypes.safeParse(req.body);
        if(!parseData.success){
            res.status(400).json({
                error:parseData.error
            })
        }else{
            const email = parseData.data.email;
            const password = parseData.data.password
            const userExistOrNot = await client.user.findFirst({
                where:{
                    email,
                }
            })
            if(userExistOrNot){
                const validUser = await bcrypt.compare(password,userExistOrNot?.password!);
                if(validUser){
                    const token = jwt.sign({
                        email:userExistOrNot.email
                    },jwtSecret,{ expiresIn: '30d' })
                    res.cookie("token",token,{
                        httpOnly:true,
                        secure:process.env.NODE_ENV == "production" ? true : false,
                        sameSite:process.env.NODE_ENV == "production" ? "none" : "lax",
                        maxAge:30 * 24 * 60 * 60 * 1000,
                        path:"/"
                    }).json({
                        login:"success",
                    })
                }else{
                    res.status(404).json({
                        error:"Incorrect Password"
                    })
                }
            }else{
                res.status(404).json({
                    error:"user not exist SignUp please"
                })
            } 
        }
    } catch (error) {
        console.log(error);
    }
});

loginRoute.get("/authorized",async(req:Request,res:Response)=>{
    const token = req.cookies.token;

   try {
     const authorized = jwt.verify(token,jwtSecret);
     if(authorized){
         res.send(true)
     }else{
        res.send(false)
     }
   } catch (error) {
    res.send(false)
   }
   await client.user.findFirst({});
});

loginRoute.get("/getuser",tokenMiddleware,(req:Request,res:Response)=>{
    try {
        const username = req.username;
        res.status(200).send(username);
        if(!username) {
            res.send("somthing wrong")
        }
    } catch (error) {
        console.log(error);
    }
})

loginRoute.post("/logout",tokenMiddleware,(req:Request,res:Response)=>{
    res.clearCookie("token",{
        httpOnly:true,
        secure:true,
        sameSite:"none",
        path:"/"
    });
    res.status(200).send("Logout success")
});



