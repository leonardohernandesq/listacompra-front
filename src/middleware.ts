import { NextResponse, NextRequest } from "next/server";
import { getCookieServer } from '@/utils/cookieServer';
import api from "./config/api";

export async function middleware(req: NextRequest){
    const {pathname} = req.nextUrl
    const privateRoutes = ['/dashboard', '/additem', '/addlist', '/list', '/addcategory']; 
    const token = getCookieServer();
    
    if(pathname.startsWith("/_next") || (pathname === '/' && !token)){
        return NextResponse.next();
    }

    if(!token){
        return NextResponse.redirect(new URL('/', req.url))
    }

    const isValid = await validateToken(token);

    const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));
    
    if(isPrivateRoute){    
        if(!isValid){
            return NextResponse.redirect(new URL('/', req.url))
        }
        
        return NextResponse.next();
    }

    if(!isPrivateRoute && isValid){
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }
}

async function validateToken(token: string){
    if(!token) return false;

    try {
        await api.get("/api/users/verify-token", {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        return true
    } catch (error) {
        console.log(error)
        return false
    }
}