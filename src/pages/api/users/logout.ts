import {withIronSessionApiRoute} from "iron-session/next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
// import withHandler, { ResponseType } from "../../../../../libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
// import { withApiSession } from "../../../../../libs/server/withSession";
import { withApiSession } from "@libs/server/withSession";
import { json } from "stream/consumers";

async function handler(
    req:NextApiRequest, res:NextApiResponse<ResponseType>
){    
    
//     if(req.method === "GET"){
//         const profile = '12975';
//         //여기서 로그인 정보 가져와야할듯
//     res.json({
//         ok:true,
//         profile,
//     })
// }
    //로그아웃 처리
    if(req.method === "POST"){  
            
            console.log("로그아웃하러 왔나요");
            await req.session.destroy();
            res.json({
                ok:true,
            })
    }
}

export default withApiSession(withHandler({
    methods:[ "GET", "POST"], 
    handler,
}));