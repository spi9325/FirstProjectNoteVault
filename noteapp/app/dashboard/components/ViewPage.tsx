"use client"
import { NoteDiv } from "@/app/UI/NoteDiv";
import axios from "axios";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

interface noteType{
    title:string;
    description:string;
    noteNo:number;

}

export function ViewPage(){
    const [note,setNote] = useState<noteType>();
    const queryParams = useSearchParams()
    const noteNo = queryParams.get("noteNo");
    useEffect(()=>{
         async function getNote(){
            try {
                const note = await axios.post<noteType>(`${process.env.NEXT_PUBLIC_Backend_URL}/notes/view?noteNo=${noteNo}`,{}
                    ,{
                        withCredentials:true
                    }
                );
                setNote(note.data);
            } catch (error) {
             console.log(error);   
            }
         }
         getNote();
    },[])

    return (
        <div className="">
            <div className="md:hidden">
            <NoteDiv title={note?.title} description={note?.description} buttonText={""}/>
            </div>
          
            
        </div>
    )
}