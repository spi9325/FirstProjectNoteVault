"use client"
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface resType{
    message:string
}
export function DeletePage(){
    const router=useRouter();
    const searchParam = useSearchParams();
    const noteNo = searchParam.get("noteNo");
    
    async function del() {
        try {
            const res = await axios.delete<resType>(`${process.env.NEXT_PUBLIC_Backend_URL}/notes/delete?noteNo=${noteNo}`,{withCredentials:true})
            if(res.status == 200){
                toast.success(`${res.data.message}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                router.push("/dashboard/bulk");
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
    }
    useEffect(()=>{
        del();
    },[])

    return(
        <div></div>
    )
}