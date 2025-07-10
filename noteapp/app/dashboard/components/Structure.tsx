"use client"

import { useNotesContext } from "../../context/notesStore"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { MainSkeleton } from "./MainSkeleton"
import axios from "axios"

export function Structure() {
    const { user } = useNotesContext();
    const [authorized,setAuthorized] = useState<boolean>(false);
    const [loading,setLoading] = useState<boolean>(true);
    const router = useRouter();
    
    useEffect(() => {
        async function verifyUser(){
            try {
                    
                    const res = await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}/user/authorized`,
                        {
                            withCredentials:true
                        }
                    )
                    if(res.data == true){
                        setAuthorized(true)
                        setLoading(false);
                    }else{
                        router.push("/login/signup");
                    }
                
            } catch (error) {
                console.log(error);
            }}
            
            verifyUser()
            
    },[])
  

    return (
        <div className="">
            {
                loading ? (<div className=""><MainSkeleton/></div>)
                    :  authorized ? (<div className="">
                        <div className="md:hidden border w-[100%] mt-[80px]">
                            <h1 className="shadow-xl bg-purple-100 text-[50px] sm:text-[70px] text-center font-[Comfortaa] text-red-500 pb-5 sm:pb-3 sm:py-3">Welcome <span className="text-green-400">{user}</span> your creation start here</h1>
                            <div className="w-full border mt-[70px] px-2 py-7 rounded-t-2xl shadow-xl">
                                <div className="">
                                    <h2 className="text-3xl pl-4">Just There </h2>
                                    <div className=" p-2 rounded-sm drop-shadow-md">
                                        <h3 className="pl-9 my-3 underline">Good To Go</h3>
                                        <div className=" flex justify-center gap-2">
                                            <Link className="bg-black text-white rounded-lg w-[35%] border text-center mt-5 py-2 " href={"/dashboard/create"}>Create</Link>
                                            <Link className="bg-blue-300 rounded-lg w-[35%] border text-center mt-5 py-2 " href={"/dashboard/bulk"}>View</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                ) : null

            }
        </div>
    )
}