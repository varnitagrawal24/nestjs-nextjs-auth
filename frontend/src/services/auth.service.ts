import { postWithOutAuth } from "@/lib/axiosClient";
import { SIGN_UP_URL } from "./url.service";




export const signup = (data: {
    email: string,
    password: string,
    username: string
}) => postWithOutAuth(SIGN_UP_URL(), data);


