import express, { Request, Response } from "express";
import {userSignInSchema,userSignupSchema} from "@repo/common/src/validation";
import {prismaClient} from "@repo/db/src/index"
import jwt from "jsonwebtoken";
const router = express.Router();


router.post('/signup',async(req:Request,res:Response)=>{
    const { success } = userSignupSchema.safeParse(req.body);
    if(!success){
        res.status(400).json({msg:"Invalid Inputs!"});
        return;
    }
    try{
        const { name,email,password } = req.body;
        // do db stuff.
        const existingUser = await prismaClient.user.findUnique({where:{
            email:email
        }});

        if(!existingUser){
            res.status(301).json({msg:"Already Account Exists!"})
            return;
        }
   
        const user = await prismaClient.user.create({data:{
            name:name,
            email:email,
            password:password,
        }});

        res.status(200).json({msg:"Successfully Created Account!",userId:user.email});

    }catch(error){
        res.status(400).json({error:error});
    }
    return;
})


router.post('/signin',async(req:Request,res:Response)=>{
    const { success } = userSignInSchema.safeParse(req.body);

    if(!success){
        res.status(400).json({msg:"Invalid Inputs!"});
        return;
    }

    const {email,password} = req.body;
    const JWT_SECRET = process.env.JWT_SECRET || "";
    try{
        // do db stuff.
        const existingUser = await prismaClient.user.findUnique({
            where:{
                email:email
            }
        });
        if(!existingUser){
            res.status(301).json({msg:"User not Found! Create Account!"});
            return;
        }
        if(existingUser.password !== password){
            res.status(400).json({msg:"Invalid Credentials!"});
            return;
        }

        const token = await jwt.sign({userId:existingUser.id},JWT_SECRET);

        res.status(200).json({msg:"Login Successfully!",token:token});
        
    }catch(error){
        res.status(400).json({error:error});

    }
    return;
});




export default router;