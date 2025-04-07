import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
const JWT_SECRET = process.env.JWT_SECRET!
const client = new PrismaClient();
export async function authorized(req: Request, res: Response, next: NextFunction) {
    try {
        // const authToken = req.headers['authorization']!
        const authToken = req.cookies.token
        const token = jwt.verify(authToken, JWT_SECRET) as JwtPayload
        //   so this middelware run lots of time but i call this db so db call is high and increase charge so thi s is not applicable 
        //   if possible then meke diffrent rout okkkkkkkkkkkkkkk or cache result
        const users = await client.user.findFirst({
            where:{
                email:token.email
            }
        })

        if (token) {
            req.email = token.email
            next()
        }else{
            res.send(false)
        }
    } catch (error) {
        res.status(401).json({
            error: "Unauthorize User"
        })
    }
}