"use client"
import { CustomeButton } from "@/app/UI/CustomeButton";
import { NoteDiv } from "@/app/UI/NoteDiv";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { IoIosCreate, IoMdHome } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { NoteContainer } from "./NoteContainer";
import { MainDashSkeleton } from "./MainDashSkeleton";
import { MainSkeleton } from "./MainSkeleton";
import { toast } from "react-toastify";
import { IoChatbubbleOutline } from "react-icons/io5";


interface notesType {
    noteNo: number;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}
interface updateType {
    createdAt: string
    description: string
    id: number
    noteNo: number
    title: string
    updatedAt: string
    userId: number
    msg: string
}
interface controlType {
    create: boolean;
    view: boolean;
    update: boolean;
    title?: string;
    description?: string;
    noteNo?: number
}
interface delType{
    message:string;
    error:string;
}

export function MainDash() {
    const [authorized,setAuthorized] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    const [loading, setLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [control, setControl] = useState<controlType>({ create: false, view: false, update: false, title: "hi", description: "hi", noteNo: 0 })
    const [notes, setNotes] = useState<notesType[]>([])
    const [search, setSearch] = useState<string>("");
    const [debouncedSearch, setDebouncedSearch] = useState<string>("");
    
    useEffect(()=>{
      async function validate(){
        try {
            const res =await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}/user/authorized`,{withCredentials:true});
            if(res.data === true){
                setAuthorized(true);
            }
          } catch (error) {
           console.log(error);
          }
      }
      validate();
    },[])

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search)
        }, 300)
        return () => clearTimeout(handler);
    }, [search]);

    const filteredNotes = debouncedSearch.trim() === ""
        ? notes
        : notes.filter(note =>
            note.title.toLowerCase().includes(debouncedSearch.toLowerCase())
        );

    function handelSidebar() {
        setSidebar(!sidebar)
    }
    function handelControl(ctrhandel: string, noteNo?: number, title?: string, description?: string) {
        if (ctrhandel == "view") {
            setControl((prev) => ({ ...prev, view: true, title: title, description: description, noteNo }))
        }
        if (ctrhandel == "update") {
            setControl((prev) => ({ ...prev, update: true, title: title, description: description, noteNo }))
        }
        if (ctrhandel == "create") {
            setControl((prev) => ({ ...prev, create: true }))
        }
    }
    async function updateFn(title: string, description: string) {
        
        try {
            const note = notes.filter((cur)=>{
                return cur.title.includes(title) && cur.description.includes(description)
            })
            if(title == note[0]?.title && description == note[0]?.description){
                toast.warning(`nothing change why update`, {
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
            setUpdateLoading(true);
            const res = await axios.patch<updateType>(`${process.env.NEXT_PUBLIC_Backend_URL}/notes/update`,
                {
                    noteNo: Number(control.noteNo),
                    title,
                    description
                },
                {
                    withCredentials: true
                }
            )
            
            if (res.status == 200) {
                toast.success(res.data.msg, {
                                    position: "top-center",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: false,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                    });
                setNotes((prevNotes) =>
                    prevNotes.map(note =>
                        note.noteNo === control.noteNo
                            ? { ...note, title, description, updatedAt: new Date().toISOString() }
                            : note
                    )
                );
                setUpdateLoading(false);
            }

        } catch (error) {
            console.log(error);
        }

    }
    async function handelDelete(noteNo:number) {
        try {
            const response = await axios.delete<delType>(`${process.env.NEXT_PUBLIC_Backend_URL}/notes/delete?noteNo=${noteNo}`,{withCredentials:true});

            if (response.status === 200) {
                toast.success(response.data?.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                setNotes((prevNotes) => prevNotes.filter((note) => note.noteNo !== noteNo));
            }else{
                toast.error(`${response.data?.error}`, {
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
    }

    function handelClose() {
        setControl((prev) => ({ ...prev, view: false }))
    }
    function handelUpdateClose() {
        setControl((prev) => ({ ...prev, update: false }))
    }
    function handelCreateClose() {
        setControl((prev) => ({ ...prev, create: false }))
        window.location.reload();
    }

    useEffect(() => {
        async function getNotes() {
            try {
                const res = await axios.get<notesType[]>(`${process.env.NEXT_PUBLIC_Backend_URL}/notes/all`, { withCredentials: true })
                if (res.data && Array.isArray(res.data)) {
                    setNotes(res.data);
                } else {
                    setNotes([]);
                }
            } catch (error) {
                console.log(error);
                setNotes([]);
            } finally {
                setLoading(false);
            }
        }
        getNotes();
    }, [])

    return (
        <div className="">
            {
                !authorized ? (<MainSkeleton/>)
                :
            <div className=" w-full p-2 h-screen text-whit hidden md:block">
                <div className=" w-full mb-2 shadow-md">
                    <h1 className="">Note <span className="text-purple-500">Vault</span></h1>
                    <p className="pl-3 bg-"><span className="">Dashboard</span></p>
                </div>

                <div className=" mb-3 relative shadow-m">
                    <div className="w-[500px]  mx-auto flex justify-around py-3 items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-2xl">
                        <input className="w-[250px] rounded-sm p-[4px] bg-green-100  " type="text" placeholder="Search Note......" value={search}
                            onChange={handleSearch} />
                        <div className="flex gap-3 items-center">
                            {
                                authorized ? (<Link href={"/login/logout"}><CustomeButton text={"Logout"} textColor=" text-white sign" /></Link>)
                                    :
                                    (<Link href={"/login/signup"}><CustomeButton text={"SignUp"} textColor=" text-white sign" /></Link>)
                            }
                            <FaBars onClick={handelSidebar} className="text-2xl" />
                        </div>
                    </div>
                </div>


                <div className={`z-50 absolute -left-[200px] lg:-left-[300px]  bg-slate-100 transition-all w-[200px] lg:w-[300px] h-[calc(100vh-154px)] rounded-md ${sidebar ? "left-[10px] lg:left-[20px]" : ""}`}>
                    <div className="w-full  py-3 text-lg mb-2 pl-2 font-mono bg-white rounded-md flex justify-between">Content <span onClick={() => setSidebar(false)} className="px-2 lg:px-4 mr-2 lg:mr-4 lg:py-1 bg-black text-white flex justify-center items-center rounded-lg cursor-pointer">X</span></div>

                    <div className="mb-1 transition-all hover:shadow-md hover:cursor-pointer w-[80%] mx-auto p-2 flex items-center justify-start gap-2 rounded-md">
                        <Link className="flex gap-2 lg:gap-4 lg:pl-3" href={"/"}>
                            <IoMdHome className="text-2xl text-blue-500 bg-black rounded" />
                            <p className="hover:translate-x-1 transition-all font-thin">Home</p>
                        </Link>
                    </div>
                    
                    <div className="mb-1 transition-all hover:shadow-md hover:cursor-pointer w-[80%] mx-auto p-2 flex items-center justify-start gap-2 rounded-md">
                        <Link className="flex gap-2 lg:gap-4 lg:pl-3" onClick={() => handelControl("create")} href={"/dashboard/create"}>
                            <IoIosCreate className="text-2xl text-yellow-400 bg-black rounded" />
                            <p className="hover:translate-x-1 transition-all font-thin">create</p>
                        </Link>
                    </div>

                    <div className="mb-1 transition-all hover:shadow-md hover:cursor-pointer w-[80%] mx-auto p-2 flex items-center justify-start gap-2 rounded-md">
                        <Link className="flex gap-2 lg:gap-4 lg:pl-3"  href={"/chat"}>
                            <IoChatbubbleOutline className="text-2xl text-white bg-black rounded" />
                            <p className="hover:translate-x-1 transition-all font-thin">Chat</p>
                        </Link>
                    </div>

                </div>

                <div className="w-[90%]  mx-auto p-1 relative">
                    {
                        <div className="">
                            {
                                loading ? (
                                <div className="">
                                <MainDashSkeleton/>
                                
                                </div>)
                                    :
                                    (
                                        filteredNotes.length == 0 ? <div className="">notes not found or Refresh...</div> :
                                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                                                {

                                                    filteredNotes?.map((cur, index) => {
                                                        const date = new Date(cur.createdAt);
                                                        const date2 = new Date(cur.updatedAt);
                                                        const created = date.toLocaleDateString();
                                                        const created2 = date2.toLocaleDateString();
                                                        return (
                                                            <div key={index} className=" shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-2 px-1">
                                                                <div className="px-2">
                                                                    <p className="w-[80px] mt-1 bg-black text-white rounded-lg  px-3 mb-2">Title :</p>
                                                                    <div className=" flex justify-end">
                                                                        <p className=" w-[90%] h-[60px] overflow-hidden text-ellipsis line-clamp-2 outline px-2 rounded-md">{cur.title ? cur.title.slice(0, 50) : "No Title"}</p>
                                                                    </div>
                                                                </div>
                                                                <div className=" p-2">
                                                                    <div className=" w-[90%] ml-[38px] pr-1 mb-2 flex justify-end gap-8">
                                                                        <p className="text-sm"><span className="font-bold">create</span> : {created}</p>
                                                                        <p className="text-sm"><span className="font-bold">update</span> : {created == created2 ? "not update" : created2}</p>
                                                                    </div>
                                                                </div>

                                                                <div className="w-full  p-2 flex justify-end">
                                                                    <div className=" w-[40%] lg:w-[50%] flex justify-between px-4 text-xl">
                                                                        <Link className="bg-black mr-1 py-1 text-green-400 px-2 rounded-lg" onClick={() => handelControl("view", cur.noteNo, cur.title, cur.description)} href={""}><FaEye /></Link>
                                                                        <Link className="bg-black mr-1 py-1 text-white px-2 rounded-lg" onClick={() => handelControl("update", cur.noteNo, cur.title, cur.description)} href={""}><RxUpdate /></Link>
                                                                        <Link className="bg-black mr-1 py-1 text-red-500 px-2 rounded-lg" onClick={()=>handelDelete(cur.noteNo)}  href={``}><MdDelete /></Link>
                                                                    </div>
                                                                </div>

                                                                <div className="w-[100%]  text-md  p-2 overflow-hidden flex justify-end">
                                                                    <p className="line-clamp-4 w-[90%] h-[100px]   p-1 outline">{cur.description}</p>
                                                                </div>



                                                            </div>
                                                        )
                                                    })
                                                }

                                            </div>)
                            }
                        </div>
                    }
                    <div className="">
                        {
                            control.view ?
                                (<div className="absolute rounded-2xl w-full top-0 left-0 p-2 backdrop-blur-[10px] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                                    <div className="w-full flex justify-end">
                                        <button onClick={handelClose} className="bg-black px-2 text-white rounded ">close</button>
                                    </div>
                                    <div className="backdrop-blur-[10px] ">
                                        <NoteDiv title={control.title} description={control.description} noteNo={control.noteNo} />
                                    </div>
                                </div>
                                ) : null

                        }

                    </div>

                    <div className="hidden md:block">
                        {
                            control.update ?
                                (<div className="absolute rounded-2xl w-full top-0 left-0 p-2 backdrop-blur-[10px] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                                    <div className="w-full flex justify-end">
                                        <button onClick={handelUpdateClose} className="bg-black px-2 text-white rounded ">close</button>
                                    </div>
                                    <div className="backdrop-blur-[10px]">
                                        <NoteDiv title={control.title} description={control.description} noteNo={control.noteNo} updateFn={updateFn} buttonText={updateLoading ? "updating....":"update"} />
                                    </div>
                                </div>
                                ) : null
                        }
                    </div>

                    <div className="hidden md:block">
                        {
                            control.create ?
                                (<div className="absolute rounded-2xl w-full top-0 left-0 p-2 backdrop-blur-[10px] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                                    <div className="w-full flex justify-end">
                                        <button onClick={handelCreateClose} className="bg-black px-2 text-white rounded ">close</button>
                                    </div>
                                    <div className="backdrop-blur-[10px]">
                                        <NoteContainer/>
                                    </div>
                                </div>
                                ) : null
                        }
                    </div>
                </div>
            </div>
            }
        </div>
    )
}