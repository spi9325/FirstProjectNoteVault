"use client"
import axios from "axios";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface NotesContextType {
    toggle: boolean;
    setToggle: Dispatch<SetStateAction<boolean>>;
    user: string;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);



export const NotesContextProvider = ({ children }: { children: ReactNode }) => {
    const [toggle, setToggle] = useState(false);
    const [user, setUser] = useState("user")

    
      
    const getUser = async () => {
        try {
            const res = await axios.get<string>(`${process.env.NEXT_PUBLIC_Backend_URL}/user/getuser`, {
                withCredentials: true,
            });
            setUser(res.data);
        } catch (error) {
            console.log("Something went wrong", error);
        }
    };

    useEffect(() => {
        getUser()
    }, [])
    


    return <NotesContext.Provider value={{ toggle, setToggle, user }}>
        {children}
    </NotesContext.Provider>
}

export const useNotesContext = () => {
    const context = useContext(NotesContext)
    if (!context) throw new Error("pls use app in NotesContextProvider")
    return context;
}