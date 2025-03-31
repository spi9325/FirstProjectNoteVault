"use client"
import { NoteDiv } from "@/app/UI/NoteDiv"
import axios from "axios";
import { use, useEffect, useState } from "react"
import { toast } from "react-toastify";

interface noteType{
    title:string;
    description:string
}
interface updateType{
    createdAt:string 
description:string 
id: number
noteNo: number
title: string
updatedAt: string
userId: number
msg:string
}

export default function Update({params}:{params:Promise<{noteNo:number}>}){
    const {noteNo} =use(params)
    const [note,setNote] = useState<noteType>();
    const [updateLoading,setUpdateLoading]=useState(false);
    
    useEffect(()=>{
        async function getNote(){
            try {
                const note = await axios.post<noteType>(`${process.env.NEXT_PUBLIC_Backend_URL}/notes/view?noteNo=${noteNo}`,{},{
                    withCredentials:true
                });
                setNote(note.data)
            } catch (error) {
                console.log(error);
            }
            
        }
        getNote();
    },[])
    async function updateFn(title:string,description:string){ 
                
       try {
        if(title == note?.title && description == note?.description){
            toast.warning(`you not change anythig why update`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                return
        }
        setUpdateLoading(true)
         const res = await axios.patch<updateType>(`${process.env.NEXT_PUBLIC_Backend_URL}/notes/update`,
             {
               noteNo:Number(noteNo),  
               title,
               description  
             },
             {
                 withCredentials:true
             }
         )
 
         if(res.status == 200){
            setUpdateLoading(false);
                        toast.success(`${res.data.msg}`, {
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
        setUpdateLoading(false)
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

    return(
        <div className="md:hidden">
            <NoteDiv title={note?.title} description={note?.description} buttonText={`${updateLoading ?"Updating..":"Update"}`} noteNo={noteNo} updateFn={updateFn}/>
        </div>
    )
}