import express from "express"
import { loginRoute } from "./routes/loginRoute";
import cors from "cors"
import cookieParser from "cookie-parser"
import * as dotenv from 'dotenv';
import { notesRoute } from "./routes/notesRoute";
import { roomRoutes } from "./routes/roomRoute";
import job from "./config/cron";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser())
console.log(typeof process.env.FRONTEND_URL,process.env.FRONTEND_URL)
app.use(cors({
  origin:process.env.FRONTEND_URL?.toString(),
  credentials: true
}))

if(process.env.NODE_ENV === "production") job.start();
app.use("/user",loginRoute)
app.use("/notes",notesRoute)
app.use("/room",roomRoutes)


const port =8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


