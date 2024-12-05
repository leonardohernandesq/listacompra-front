import axios from "axios";
import { getCookieClient } from "@/utils/cookieClient";

const api = axios.create({
    baseURL: 'https://listacompra-front.vercel.app'
})

const addAuthTokenToHeader = async (config: any) => {
    try {
        const token = getCookieClient();

        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers["Content-Type"] = "application/json";
        return config;
    } catch (error) {
        console.log(error);
        return config;
    }
}

api.interceptors.request.use(addAuthTokenToHeader)

export default api;