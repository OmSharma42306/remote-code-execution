import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Request,Response } from "express";
import baseRouter from "./api/api";
dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/v1',baseRouter);

app.get('/',(req:Request,res:Response)=>{
    res.status(200).json({msg: "Hello!"});
    return;
})



app.listen(PORT,()=>{console.log(`Server Started at PORT : ${PORT}`)});