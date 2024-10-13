import { cookies } from "next/headers";

export function getCookieServer(){
    const token = cookies().get("auth_token")?.value;

    return token || null
}