"use client"
import { CustomeButton } from "@/app/UI/CustomeButton";
import axios from "axios";
import { useRef } from "react";
import { toast } from "react-toastify";
async function createRooms(roomName:string){
    const res = await axios.post(`${process.env.NEXT_PUBLIC_Backend_URL}/room/create`,
        {
            roomName:roomName
        },
        {
            withCredentials:true
        }
    )
    if(res.status == 200){
        toast.success("room created");
    }
   
}
async function joinRooms(roomName:string){
    const join = await axios.post(`${process.env.NEXT_PUBLIC_Backend_URL}/room/join`,
        {
            roomName
        },
        {
            withCredentials:true
        }
    )
   if(join.status == 200){
    toast.success("you Joined"+roomName)
   }
}
export function CreateRoom(){
    const roomName = useRef<HTMLInputElement>(null)
   
    
    return(
        <div className="w-full flex justify-center items-center border shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            <div className="w-[90%] bg-black rounded-md border flex items-center justify-center flex-col p-2">
                <h1 className="text-xl">Create Room</h1>
                <input ref={roomName} type="text" placeholder="Enter Room Name" className="w-[80%] mt-5 p-2 rounded text-black"/>
                <div className="flex gap-2">
                <div onClick={()=>createRooms(roomName.current?.value.toString()!)} className=""><CustomeButton text="Create" width=" mt-6 w-[100px] bg-white text-black"/></div>
                <div onClick={()=>joinRooms(roomName.current?.value.toString()!)} className=""><CustomeButton text="Join" width=" mt-6 w-[100px] bg-white text-black"/></div>
                </div>
            </div>
        </div>
    )
}