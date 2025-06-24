import express, { Request, Response } from "express";
import {userSignInSchema,userSignupSchema} from "@repo/common/src/validation";

const router = express.Router();


router.post('/signup',async(req:Request,res:Response)=>{
    const { success } = userSignupSchema.safeParse(req.body);
    if(!success){
        res.status(400).json({msg:"Invalid Inputs!"});
        return;
    }
    try{
        // do db stuff.
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
    try{
        // do db stuff.
    }catch(error){
        res.status(400).json({error:error});

    }
    return;
});




export default router;