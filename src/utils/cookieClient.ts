import { getCookie } from "cookies-next";

export function getCookieClient(){
    const token = getCookie("auth_token")

    return token
}