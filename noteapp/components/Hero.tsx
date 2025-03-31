"use client"
import Link from "next/link";
import { CustomeButton } from "../app/UI/CustomeButton";
import { useGSAP } from "@gsap/react";
import  {gsap} from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import { useRouter } from "next/navigation";
import axios from "axios";
gsap.registerPlugin(ScrollTrigger)
export function Hero(){

const router = useRouter()
    const mm = gsap.matchMedia()

        useGSAP(()=>{           
            gsap.from("#hero-heading",{
                y:"-20px",
                opacity:0,
                duration:2,
                delay:2,
            })
            
            mm.add("(min-width:768px)", () => {
               gsap.to("#hero-heading",{
                    scale:1.3,
                    duration:3,
                    color:"white",
                    scrollTrigger:{
                        trigger:"#hero-heading",
                        scroller:"body",
                        start:"top 10%",
                        end:"top -20%",
                        scrub:1
                    }
               })
               gsap.to("#bouncing",{
                    scale:1.11,
                    duration:1,
                    color:"pink",
                    yoyo:true,
                    repeat:-1
                    
                })
            })
            mm.add("(max-width:767px)",()=>{
                gsap.to("#hero-heading",{
                    scale:1.1,
                    duration:3,
                    color:"white",
                    scrollTrigger:{
                        trigger:"#hero-heading",
                        scroller:"body",
                        start:"top 4%",
                        end:"top -20%",
                        scrub:1
                    }
               })
               gsap.to("#bouncing",{
                    scale:1.11,
                    duration:1,
                    color:"pink",
                    yoyo:true,
                    repeat:-1
                    
                })
            })
         
        })
        
       async function gotoDashboard(){
            const res = await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}/user/authorized`,{withCredentials:true});
            if(res.data === true){
                router.push("/dashboard")
            }else{
                router.push("/login/signup")
            }
        }
       
    return (
       <div className="w-full h-full md:mt-9">
        <div className="text-center md:mt-[50px]">
            <h1 id="hero-heading" className="text-5xl font-[Comfortaa] md:text-7xl leading-[55px] sm:leading-[60px]"> Save Your Notes With NoteVault</h1>
        </div>
        <div  className="text-center p-4">
            <h4  className="text-2xl">create and modify your notes easily & <span className="text-purple-600 font-serif">Secure</span></h4>
        </div>
        <div className="flex justify-center p-5 ">
            <Link className="" onClick={gotoDashboard} id="bouncing" href={"/dashboard"}><CustomeButton text="Get Started" textSize="text-[22px]" width="w-[150px] lg:w-[200px]" textColor="text-green-200" height="h-[50px]"/></Link>
        </div> 
        <p className="text-center text-[18px]">Unlimited | Free Access</p>
       </div>
    )
}