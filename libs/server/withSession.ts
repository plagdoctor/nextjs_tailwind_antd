import {withIronSessionApiRoute} from "iron-session/next";
declare module "iron-session" {
    interface IronSessionData {
        user?: {
            empno:String;
            empname:String;
        }
    }
}

const cookieOptions = {
    cookieName: "next1_offline_session",
    password: process.env.IRON_SESSION_KEY!,
};

export function withApiSession(fn:any) {
    return withIronSessionApiRoute(fn, cookieOptions);
} 