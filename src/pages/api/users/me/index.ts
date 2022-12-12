import {withIronSessionApiRoute} from "iron-session/next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
// import withHandler, { ResponseType } from "../../../../../libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
// import { withApiSession } from "../../../../../libs/server/withSession";
import { withApiSession } from "@libs/server/withSession";

async function handler(
    req:NextApiRequest, res:NextApiResponse<ResponseType>
){    
    
    if(req.method === "GET"){
        const profile = '12975';
        //여기서 로그인 정보 가져와야할듯
    res.json({
        ok:true,
        profile,
    })
}

}

export default withApiSession(withHandler({
    methods:[ "GET", "POST"], 
    handler,
}));