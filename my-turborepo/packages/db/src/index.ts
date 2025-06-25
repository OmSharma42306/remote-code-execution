import {PrismaClient} from "./generated/prisma/client"
import dotenv from "dotenv"

dotenv.config();

export const prismaClient = new PrismaClient();


