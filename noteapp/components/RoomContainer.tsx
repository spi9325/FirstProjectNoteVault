"use client"
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react"
import { AllRoomLoad } from "./AllRoomLoad";
import { MessageLoader } from "./MessageLoader";



interface roomsType {
    roomName: string
    id: number
}
interface room {
    roomName: string;
    roomId: number;
}
interface Message {
    senderId: number;
    content: string;
    roomId: number
}

export function RoomContainer() {

    const [allRoom, setAllRooms] = useState<roomsType[]>([]);
    const [allRoomLoad, setAllRoomsLoad] = useState<boolean>(true);
    const [allJoinRoom, setAllJoinRooms] = useState([]);
    const [allJoinRoomLoad, setAllJoinRoomsLoad] = useState<boolean>(true);
    const [room, setRoom] = useState<room>({ roomName: "", roomId: 0 });
    const [join, setJoin] = useState<room>({ roomName: "", roomId: 0 });
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [messagesLoad, setMessagesLoad] = useState<boolean>(false);
    const [userId, setUserId] = useState([]);
    const wsRef = useRef<WebSocket>(null)
    const wsRefJoin = useRef<WebSocket>(null)
    const msg = useRef<HTMLTextAreaElement>(null)

    // get all Rooms and joinrooms
    useEffect(() => {
        async function fetchData() {
            try {
                const [roomsRes, joinedRes] = await Promise.all([
                   await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}/room/all`, { withCredentials: true }),
                   await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}/room/joinrooms`, { withCredentials: true }),
                ]);

                setAllRooms(roomsRes.data.rooms || []);
                setUserId(roomsRes.data.userId);
                setAllJoinRooms(joinedRes.data.allRooms || []);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            } finally {
                setAllRoomsLoad(false);
                setAllJoinRoomsLoad(false);
            }
        }
        fetchData();
    }, []);
    // get all msg
    useEffect(() => {
        if (!room.roomName) return
        const controller = new AbortController();
        async function getMessages() {
            try {
                setMessagesLoad(true);
                const messages = await axios.post(`${process.env.NEXT_PUBLIC_Backend_URL}/room/messages`,
                    {
                        roomName: room.roomName
                    },
                    { withCredentials: true, signal: controller.signal }
                );
                if (messages.status == 200) {
                    setMessages(messages.data.messages || []);
                    setMessagesLoad(false);
                }
            } catch (error) {
                if (!axios.isCancel(error)) console.error("Error fetching messages:", error);
            }
        }
        getMessages();

        return () => {
            controller.abort();
        };
    }, [room.roomName]);
    // get all join msg
    useEffect(() => {
        if (!join.roomName) return
        const controller = new AbortController();
        async function getMessages() {
            try {
                setMessagesLoad(true);
                const messages = await axios.post(`${process.env.NEXT_PUBLIC_Backend_URL}/room/messages`,
                    {
                        roomName: join.roomName
                    },
                    { withCredentials: true, signal: controller.signal }
                );
                if (messages.status == 200) {
                    setMessages(messages.data.messages || []);
                    setMessagesLoad(false);
                }
            } catch (error) {
                if (!axios.isCancel(error)) console.error("Error fetching messages:", error);
            }
        }
        getMessages();

        return () => {
            controller.abort();
        }
    }, [join.roomName]);
    // connect ws
    useEffect(() => {
        if (!room.roomName) return;
        const socket = new WebSocket(`${process.env.NEXT_PUBLIC_Chat_Backend_URL}`);
        wsRef.current = socket;
        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: "create",
                payload: {
                    roomName: room.roomName,
                }
            }));

            socket.onmessage = (message) => {
                const parseMessage = JSON.parse(message.data);
                if (parseMessage.type == "chat") {
                    setMessages((prev) => [...prev, parseMessage.payload])
                }
            }
        }

        () => {
            socket.close();
            wsRef.current = null;
        }
    }, [room.roomName])
    // joinroom ws connect
    useEffect(() => {
        if (!join.roomName) return;
        const socket = new WebSocket(`${process.env.NEXT_PUBLIC_Chat_Backend_URL}`);
        wsRefJoin.current = socket;
        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: "join",
                payload: {
                    roomName: join.roomName,
                }
            }));

            socket.onmessage = async (message) => {
                const parseMessage = JSON.parse(message.data);
                if (parseMessage.type == "chat") {
                    setMessages((prev) => [...prev, parseMessage.payload])
                }
            }
        }
        () => {
            socket.close();
        }
    }, [join.roomName]);
    // for scrool automatic msg to top
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    const sendMessage = useCallback(async () => {
        try {
            if (room.roomName) {
                const pushToDb = axios.post(`${process.env.NEXT_PUBLIC_Backend_URL}/room/addmessage`,
                    {
                        roomId: room.roomId,
                        content: msg.current?.value.toString()
                    },
                    { withCredentials: true }
                )
                wsRef.current?.send(JSON.stringify({
                    type: "chat",
                    payload: {
                        senderId: userId,
                        roomId: room.roomId,
                        content: msg.current?.value.trim()
                    }
                }));
                msg.current!.value = ""
            }
            if (join.roomName) {
                console.log(join)
                const pushToDb = axios.post(`${process.env.NEXT_PUBLIC_Backend_URL}/room/addmessage`,
                    {
                        roomId: join.roomId,
                        content: msg.current?.value.toString()
                    },
                    { withCredentials: true }
                )
                wsRefJoin.current?.send(JSON.stringify({
                    type: "chat",
                    payload: {
                        senderId: userId,
                        roomId: join.roomId,
                        content: msg.current?.value
                    }
                }))
                msg.current!.value = ""
            }
        } catch (error) {
            console.log(error);
        }
    }, [room.roomName, join.roomName, userId]);

    return (
        <div className="borde h-full p-2 flex">
            <div className="outline h-[calc(100%-8.7%)] w-[200px] p-2 rounded-xl">
                <h1 className="mb-2 text-center bg-red-500 w-[23%] rounded">chats</h1>
                <div className={` relative rounded-xl px-2 flex flex-col gap-2  overflow-y-scroll max-h-[290px] scrollhide cursor-pointer`}>
                    {
                        allRoomLoad ? <AllRoomLoad /> : allRoom.length > 0 ? allRoom.map((cur, index) => {
                            return (
                                <div key={index} onClick={() => { setRoom({ roomName: cur.roomName, roomId: cur.id }) }} className="flex gap-2 borde rounded-lg">
                                    <div className="w-[50px] flex items-center justify-center h-[50px] rounded-full borde text-black bg-white">{cur.roomName.charAt(0)}</div>
                                    <div className=" max-w-[60%] min-w-[60%] overflow-x-hidden">
                                        <p className=" max-w-[100%] w-[100%]">{cur.roomName}</p>
                                        <p className="text-[11px] text-green-300">created</p>
                                    </div>
                                </div>
                            )
                        }) : <p className="my-3 text-sm mx-auto bg-cyan-300 text-black rounded p-1">No groups | create one</p>
                    }
                    <div className="bottom-0 sticky backdrop-blur-md -mx-[9px] min-h-[10px] rounded-lg"></div>
                </div>

                <h1 className="my-2 text-center px-1 bg-purple-500 w-[25%] rounded">Joins</h1>
                <div className={`${!allJoinRoomLoad ? allJoinRoom.length <= 0 ? "bg-red-300 text-black" : "" : ""} rounded-xl flex flex-col gap-2 px-2 justify-center overflow-y-scroll max-h-[290px] scrollhide cursor-pointer`}>
                    {
                        allJoinRoomLoad ? <AllRoomLoad /> : allJoinRoom.length > 0 ? allJoinRoom.map((cur: any, index) => {
                            return (
                                <div key={index} onClick={() => { setJoin({ roomName: cur.room.roomName, roomId: cur.roomId }) }} className="flex gap-2 borde rounded-lg">
                                    <div className="w-[50px] flex items-center justify-center h-[50px] rounded-full border text-black bg-white">{cur.room.roomName.charAt(0)}</div>
                                    <div className="">
                                        <p className="">{cur.room.roomName}</p>
                                        <p className="text-[11px] text-yellow-100">join</p>
                                    </div>
                                </div>
                            )
                        }) : <p className="my-3 text-sm mx-auto bg-cyan-300 text-black rounded p-1">No Join | Join one</p>
                    }

                </div>

            </div>

            <div className="borde flex-1 ml-[10px] flex flex-col">

                <div className="relative w-full outline px-3 rounded-xl h-[650px] overflow-y-auto scrollhide">
                    {
                       messagesLoad ? <MessageLoader/> : messages.map((curMsg: any, index) => (
                            <div key={index} className={`p-2 borde flex  ${curMsg.senderId === userId ? "justify-end" : "justify-start"}`}>
                                <p className={`borde max-w-[70%] text-wrap flex p-2 rounded-lg ${curMsg.senderId === userId ? "bg-green-500 text-white" : "bg-gray-300 text-black"}`}>
                                    {curMsg.content}
                                </p>
                            </div>
                        ))
                    }
                    <div ref={messagesEndRef} />
                </div>



                <div className="">
                    {
                        room.roomName || join.roomName ? <div className="flex gap-2 w-full h-[50px] borde p-1 mt-1">
                            <textarea
                                ref={msg}
                                required
                                placeholder="Type your message here..."
                                spellCheck={false}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    fontSize: '16px',
                                    resize: 'none',
                                    outline: 'none',
                                    paddingInline: '3px',
                                    padding: "4px",
                                    overflow: 'auto',
                                    color: "black",
                                    borderRadius: "5px"
                                }}
                            />
                            <button onClick={() => sendMessage()} className="bg-white text-black w-[17%] rounded-md">Send</button>
                        </div> : null
                    }
                </div>
            </div>
        </div>
    )
}
