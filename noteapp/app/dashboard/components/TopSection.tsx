"use client"
import { useNotesContext } from "@/app/context/notesStore";
import Link from "next/link";
import { useCallback } from "react";
import { FaBars } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";

export function TopSection() {
    const { toggle, setToggle } = useNotesContext()
     const handelToggle=useCallback(()=> {
        setToggle(!toggle)
    },[toggle])
    
    
    return (
        <div className="">
            <div className=" w-[85%] border mx-auto md:hidden p-2 z-50 bg-transparent rounded-lg backdrop-blur-[10px] fixed top-0 left-0 right-0 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                <div className="flex justify-between px-2">
                    <div onClick={handelToggle} className="text-lg relative cursor-pointer"><FaBars /></div>
                    <Link href={"/"}><button>Home</button></Link>
                    <Link href={"/dashboard"}><button>dashboard</button></Link>
                    <div className="text-lg font-extrabold"><Link href={"/chat"}><IoChatbubbleOutline /></Link></div>
                </div>

                <div>
                    {toggle ?
                        <div className="w-[200px] absolute bg-white -left-[5%] top-[120%] p-2 transition-shadow duration-300 cursor-pointer hover:shadow-black-400 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                            <div onClick={handelToggle} className="text-2xl cursor-pointer ml-4 mt-2">
                                <p className="bg-black w-[20%] rounded-full flex justify-center text-white">X</p>
                            </div>
                            <div className="py-4 pl-5">
                                <Link href={"/dashboard/create"}>
                                    <p className="items-center rounded-xl pl-2 py-2 mb-1 transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-200">Create</p>
                                </Link>
                                <p className="items-center rounded-xl pl-2 py-2 mb-1 transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-200">modify</p>
                                <p className="items-center rounded-xl pl-2 py-2 mb-1 transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-200">view</p>

                            </div>
                        </div>
                        : ""
                    }
                </div>
            </div>
        </div>
    )
}