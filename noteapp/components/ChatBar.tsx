"use client"
import { BiSolidDashboard } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { MdMeetingRoom } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { useState } from "react";
import { ChatMenu } from "./ui/ChatMenu";
import Link from "next/link";

export function ChatBar() {
    const [visible,setVisible] = useState({
        room:false,
        home:false,
        dashboard:false
    });
     

    function handelVisible(valtrue:string){
        if(valtrue == "room"){
            setVisible(prev=>({
                ...prev,
                room:true
            }))
        }
        if(valtrue == "home"){
            setVisible(prev=>({
                ...prev,
                home:true
            }))
        }
        if(valtrue == "dashboard"){
            setVisible(prev=>({
                ...prev,
                dashboard:true
            }))
        }
    }
    function handelHide(valtrue:string){
        if(valtrue == "room"){
            setVisible(prev=>({
                ...prev,
                room:false
            }))
        }
        if(valtrue == "home"){
            setVisible(prev=>({
                ...prev,
                home:false
            }))
        }
        if(valtrue == "dashboard"){
            setVisible(prev=>({
                ...prev,
                dashboard:false
            }))
        }
    }
    
    return (
        <div className="w-[50px] bg-slate-600 h-screen flex flex-col justify-between ">
            <div className="text-black borde mt-2 h-[200px] flex items-center flex-col">
                <div className="text-2xl mb-5"><Link href={"/chat"}><span className="text-red-600">N</span><span className="text-purple-400">V</span></Link></div>
                <Link href={"/chat/createroom"}><MdMeetingRoom onMouseEnter={()=>handelVisible("room")} onMouseLeave={()=>handelHide("room")} className="pb-2 mb-2 text-4xl relative border-b-[3px] border-green-400"/></Link>
                    <div className="text-white">
                        {
                            visible.room ? <div className="absolute z-50 top-[50px] left-[40px]"><ChatMenu text={"room"}/> </div>: null 
                        }
                    </div>
                    <Link href={"/"}><IoMdHome onMouseEnter={()=>handelVisible("home")} onMouseLeave={()=>handelHide("home")} className="pb-2 mb-2 text-4xl relative"/></Link>
                <div className="text-white">
                        {
                            visible.home ? <div className="absolute z-50 top-[100px] left-[40px]"><ChatMenu text={"Home"}/> </div>: null 
                        }
                    </div>
                <Link href={"/dashboard"}><BiSolidDashboard onMouseEnter={()=>handelVisible("dashboard")} onMouseLeave={()=>handelHide("dashboard")} className="pb-2 mb-2 text-4xl relative"/></Link>
                <div className="text-white">
                        {
                            visible.dashboard ? <div className="absolute z-50 top-[140px] left-[40px]"><ChatMenu text={"dashboard"}/> </div>: null 
                        }
                    </div>
            </div>
            <Link href={"/login/logout"} className="text-2xl flex justify-center text-black bg-green-500 rounded-full py-3 mb-3">
            <CiLogout/>
            </Link>
        </div>
    )
}