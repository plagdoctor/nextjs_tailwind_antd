// import {withIronSessionApiRoute} from "iron-session/next";
// import withHandler, { ResponseType } from "../../../../../libs/server/withHandler";
import withHandler, { ResponseType } from "@libs/server/withHandler";
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
    if(req.method === "POST"){
        const { 
            body:{empNo, empPassword},
            // session:{user},
        } = req;
        console.log(empNo);
        console.log(empPassword);
        const params = new URLSearchParams(`empNo=${empNo}&empPassword=${empPassword}`);
        const results = await fetch(
            `http://129.100.253.17:7070/kflowapi/getempinfo`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: params
            }
          )  
            .then(res => {
              //   console.log(res);
              return res.json();
            })
            .then(json => {
                console.log(json);
              return json;
            });        

    if(results['retCode'] == -1 ) {
                console.log("조회 실패");
                res.json({
                    ok:false,
                    // profile,
                })
    }
    //정상적으로 리턴 받으면,
    else {
        console.log("정상리턴");
            // console.log("json-retData= ", results['retData'][0]['user_id']);
        if(results['retData'][0]['user_id'] == empNo && results['retData'][0]['sert_num'] == empPassword ) {
            console.log("성공맞나");
            req.session.user = {
                empno : results['retData'][0]['user_id'],
                empname: results['retData'][0]['user_name'],
            }
            try
            {
                await req.session.save();
            }catch(err){
                console.log(err);
            }
            
            console.log("성공후 리턴");
            res.json({
                ok:true,
                profile: results['retData'][0],
            })
        }
        // 같지 않으면 정보 틀림,
        else  {
            console.log("로그인 정보에서 실패");
            res.json({
                ok:false,
                // profile,
            })
        }
    }              

}
}

export default withApiSession(withHandler({
    methods:[ "GET", "POST"], 
    handler,
}));