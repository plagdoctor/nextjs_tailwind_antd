import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  console.log(req.query);
  if (req.method === "POST"){
    res.status(200).json({ name: '포스트는 아직 준비 안했는뎅 필요한가?' });
  }  
  if(req.method ==="GET"){
    
    const results = fetch(
      `http://localhost:7070/kflowapi/getcommissionsaledata?storeCd=029&saleDate=20221201`,
      {
        method: 'GET',
      }
    )  
      .then(res => {
        console.log("===============================res============================");
        console.log(res);
        console.log("===============================res============================");
        return res.json();
      })
      .then(json => {
        console.log("===============================getsaleamt============================");
        console.log(json);
        console.log("===============================getsaleamt============================");
        return json;
      });    
  }
}
