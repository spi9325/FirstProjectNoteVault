import Link from "next/link";
import { BiLogoGmail } from "react-icons/bi";
import { FaInstagram, FaUsers } from "react-icons/fa";
import { GoBook } from "react-icons/go";
import { ImHome3 } from "react-icons/im";
import { IoBugSharp } from "react-icons/io5";
import { MdInfo } from "react-icons/md";
import { TiSpanner } from "react-icons/ti";

export function Footer() {

    return (
        <div className=" rounded-xl w-[95%] mx-auto mt-[200px] py-9 flex
        justify-center items-center  bg-black">
            <div className=" w-[50%] md:w-[30%] text-white p-5 md:pl-14">

                <Link href={""}><div className="text-md flex justify-start items-center gap-4 hover:text-green-100"><div className="perspective-1000">
                    <div className="transform rotate3d animate-rotate3d ">
                        <FaInstagram className="text-pink-500 text-2xl  " />
                    </div>
                </div><span className="hover:no-underline hover:text-green-300  hover:scale-x-95 transition-all duration-500 hover:pl-4 ">Social</span></div></Link>

                <Link href={""}><div className="text-md flex justify-start items-center gap-4 hover:text-green-100"><div className="perspective-1000">
                    <div className="transform rotate3d animate-rotate3d">
                        <BiLogoGmail className="text-red-500 text-2xl  " />
                    </div>
                </div><span className="hover:no-underline hover:text-green-300  hover:scale-x-95 transition-all duration-500 hover:pl-4 ">Contact</span></div></Link>

                <Link href={""}><div className="text-md flex justify-start items-center gap-4 hover:text-green-100"><div className="perspective-1000">
                    <div className="transform rotate3d animate-rotate3d">
                        <IoBugSharp className="text-white text-2xl  " />
                    </div>
                </div><span className="hover:no-underline hover:text-green-300  hover:scale-x-95 transition-all duration-500 hover:pl-4 ">Report</span></div></Link>

                <Link href={""}><div className="text-md flex justify-start items-center gap-4 hover:text-green-100"><div className="perspective-1000">
                    <div className="transform rotate3d animate-rotate3d">
                        <FaUsers className="text-green-500 text-2xl  " />
                    </div>
                </div><span className="hover:no-underline hover:text-green-300  hover:scale-x-95 transition-all duration-500 hover:pl-4 ">Users</span></div></Link>

            </div>

               <div className="  text-white w-[60%] md:w-[30%] lg:w-[20%] xl:w-[15%]">
                    <p className="text-center">Thanks for visiting</p>
                    <div className="flex justify-center"><p>Note</p><p className="text-yellow-300 pl-1">Vault</p></div>
               </div>

            <div className=" md:mx:auto w-[50%] md:w-[30%] text-white py-5 flex justify-center flex-col p-4">
                <div className=" flex gap-5 justify-end items-center">
                    <p className="hover:no-underline hover:text-green-300  hover:scale-x-95 transition-all duration-500 hover:pr-2">Home</p>
                    <div className="text-2xl text-pink-400 transform rotate3d animate-rotate3d"><ImHome3/></div>
                </div>
                <div className=" flex gap-5 justify-end items-center">
                    <p className="hover:no-underline hover:text-green-300  hover:scale-x-95 transition-all duration-500 hover:pr-2 ">Services</p>
                    <div className="text-2xl text-red-400 transform rotate3d animate-rotate3d"><TiSpanner/></div>
                </div>
                <div className=" flex gap-5 justify-end items-center">
                    <p className="hover:no-underline hover:text-green-300  hover:scale-x-95 transition-all duration-500 hover:pr-2 ">Manual</p>
                    <div className="text-2xl text-white transform rotate3d animate-rotate3d"><GoBook/></div>
                </div>
                <div className=" flex gap-5 justify-end items-center">
                    <p className="hover:no-underline hover:text-green-300  hover:scale-x-95 transition-all duration-500 hover:pr-2 ">About</p>
                    <div className="text-2xl text-green-400 transform rotate3d animate-rotate3d"><MdInfo/></div>
                </div>
            </div>
        </div>
    )
}