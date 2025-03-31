"use client"
import { CustomeButton } from "@/app/UI/CustomeButton";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
interface resultType {
    login?: string;
    error:string;
}

export default function SignIn() {
    const router = useRouter();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [result,setResult] = useState(false);
    const [processing,setProcessing] = useState(false);


    const handelSignIn = useCallback(async () => {
        if (!emailRef.current?.value && !passwordRef.current?.value) {
            alert("email and password is reqiure")
            return
        }
        try {
            setProcessing(true)
            const response = await axios.post<resultType>(`${process.env.NEXT_PUBLIC_Backend_URL}/user/signin`,
                {
                    email: emailRef.current?.value.trim(),
                    password: passwordRef.current?.value.trim()
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials:true,
                }
            )
            if(response.status == 200){
                setResult(true);
                setProcessing(false);
                toast.success('SignIn success.......', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }

        } catch (error:any) {
            
            const errors = error.response?.data?.error?.issues?.map((cur: any) => 
                cur.message
              );
            toast.error(`${errors || error.response.data.error }`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }

    }, [])


    useEffect(() => {
        if (result == true) {
            router.push("/")
        }

    }, [result])

    return (

        <div className=" text-black md:w-[500px] h-full mt-[120px] sm:w-[60%] sm: mx-auto p-2">
            <div className="pt-5 bg-black text-white p-2 rounded-2xl h-[370px] shadow-black shadow-2xl md:px-4">
                <div className="">
                    <h1 className="text-center text-xl sm:text-[23px] md:text-2xl">
                        {"SignIn with"} <span className="underline mr-1 text-red-500">Note</span><span className="underline text-purple-600 font-medium">Vault</span>
                    </h1>
                </div>
                <div className=" mt-2 p-4 flex justify-center flex-col">

                    <label className="block font-semibold">Email :</label>
                    <input id="email" ref={emailRef} autoComplete="off" className="p-1 rounded mb-2 pl-2 text-black" type="text" />
                    <label className="block font-semibold" >Password :</label>
                    <input id="password" ref={passwordRef} autoComplete="off" className="p-1 rounded pl-2 text-black" type="text" />


                    <div className={`text-center mt-4`}>
                        <CustomeButton text={`${processing ? "proceesing..":"Sign In"}`} textColor="text-black bg-green-200 hover:shadow-none "
                            textSize="text-[17px] hover:bg-green-300"
                            width="w-[120px]"
                            height="h-[45px]"
                            onClick={handelSignIn}
                        />
                    </div>
                    <Link href={'/login/signup'}><p className="text-center mt-5 text-[20px] rounded bg-slate-200 text-black">close</p></Link>
                    {
                        result ? (<div className="w-[20%] text-green-400 text-center mx-auto mt-6 rounded-xl">{result}</div>) : ""
                    }
                </div>
            </div>
        </div>

    )
}