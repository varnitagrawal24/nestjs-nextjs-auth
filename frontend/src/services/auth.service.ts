import { postWithAuth, postWithOutAuth } from "@/lib/axiosClient";
import { LOG_IN_URL, SIGN_UP_URL } from "./url.service";




export const signup = (data: {
    email: string,
    password: string,
    username: string
}) => postWithOutAuth(SIGN_UP_URL(), data);

export const login = (data: {
    email: string,
    password: string
}) => postWithOutAuth(LOG_IN_URL(), data);

