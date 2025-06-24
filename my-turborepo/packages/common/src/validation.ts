import {z} from "zod";



export const userSignupSchema = z.object({
    name : z.string(),
    email : z.string().email(),
    password : z.string().min(8),
});


export const userSignInSchema = z.object({
    email : z.string().email(),
    password : z.string().min(8),
})