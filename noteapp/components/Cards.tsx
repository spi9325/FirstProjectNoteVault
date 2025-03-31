import Link from "next/link";
import { FaLocationArrow } from "react-icons/fa";

interface cardType{
   name:string;
   description?:string;
   img?:string;
   bg?:string;
   color?:string;
}

export function Cards(){
    const card:cardType[] = [
        {name:"Creating Notes",img:"create.png" ,bg:"bg-white",color:"bg-green-300"},
        {name:"modify Notes",img:"modify.png" ,bg:"bg-green-200",color:"bg-red-500"},
        {name:"view Notes",img:"view.png" ,bg:"bg-green-200",color:"bg-red-500"},
        {name:"Share Notes",img:"share.png" ,bg:"bg-white",color:"bg-green-300"},
    ]
    return(
        <div className=" p-1 grid md:grid-cols-2 items-center gap-4 lg:gap-6 mt-[90px]  md:mt-[200px]">
            {
                card.map((cur,index)=>{
                    return(
                        <div key={index} className={` w-[100%] sm:w-[80%] md:w-[100%] lg:w-[90%] mx-auto rounded-[28px] p-6 ${cur.bg} shadow-xl`}>
                            {
                                
                                    
                                    <>
                                    <div className={` m-2 flex justify-evenly gap-2 p-3 `}>
                                        <div className={`text-xl sm:text-2xl lg:text-3xl mt-4`}><span className={`${cur.color} rounded-xl p-2 md:p-1 text-center`}>{cur.name}</span></div>
                                        <div className="max-w-[30%]"><img src={cur.img} alt="" className="object-cover rounded" /></div>
                                    </div>
                                    <div className=" flex justify-around items-center shadow-xl rounded-[50px] py-2 lg:pl-[70px] lg:pr-[70px]">
                                        <Link href={"/manual"}><FaLocationArrow className="bg-black text-5xl rounded-lg p-2 md:p-1 md:text-4xl text-white md:w-[70px] md:h-[40px]"/></Link>
                                        <Link href={"/manual"}><p className=" text -xl md:text-xl ">Learn more</p></Link>
                                    </div>
                                    </>  
                                    
                               
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}