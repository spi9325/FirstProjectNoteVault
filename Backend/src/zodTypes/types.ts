import {z} from "zod"

export const userTypes = z.object({
    username:z.string().max(10,"username max 10 char").optional(),
    email:z.string().email("email format wrong"),
    password:z.string().min(5,"the password min 5 char").max(10,"password max 10 char")
});

export const notesType = z.object({
    noteNo:z.number().optional(),
    title:z.string().min(2,"title min 2 letter"),
    description:z.string().min(2,"description min 2 letter")
}); 