import {z} from "zod";

export const RoomType = z.object({
    roomName:z.string().min(3,"creator min 3 char")
});
export const addMessageType = z.object({
    content:z.string().min(2,"creator min 2 char"),
    roomId:z.number()
});