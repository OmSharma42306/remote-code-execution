import axios from "axios";
import type {typeSignIn,typeSignUp} from "../types/types";

const host = import.meta.env.VITE_HOST
const BACKEND_BASE_PATH = `api/v1`;
const BACKEND_USER_BASE_PATH = `${BACKEND_BASE_PATH}/user`

export async function signIn({email,password}:typeSignIn){
    try{
        const response = await axios.post(`${host}/${BACKEND_USER_BASE_PATH}/signin`,{email,password});
        return response;
    }catch(error){
        console.error(error);
        return;
    }
};

export async function signUp({name,email,password}:typeSignUp){
    try{    
        const response = await axios.post(`${host}/${BACKEND_USER_BASE_PATH}/signup`,{name,email,password});
        return response;
    }catch(error){
        console.error(error);
    }
}