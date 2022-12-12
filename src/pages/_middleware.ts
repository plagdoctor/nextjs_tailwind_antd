import type { NextRequest, NextFetchEvent } from "next/server";
import { NextResponse } from "next/server";
export function middleware(req:NextRequest, ev: NextFetchEvent) {
    console.log("it works! global middleware.");
    console.log(req.ua);
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    if(req.ua?.isBot) {
        return new Response("human only, byebye", {status:403});
    }
    if (!req.url.includes("/api")){
        if (!req.url.includes("login") && !req.cookies.next1_offline_session){
           return NextResponse.redirect(url);
        }
    }
}