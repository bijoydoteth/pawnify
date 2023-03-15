// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';


type Data = {
  data?: any
  error?:any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const headers = {
        'Authorization': `Bearer ${process.env.NFT_FI_API}`,
        }
    
    const request_url = 'https://api.nftfi.com/loans/borrower/0x768F2A7CcdFDe9eBDFd5Cea8B635dd590Cb3A3F1'
    
    let data,error
    try{

        const response = await axios.get(request_url,{headers})
        data = response.data
        
    }catch(err){
        console.log(err)
        error = err
    }
    
    if (data){
        res.status(200).json({data})
    }else{
        res.status(500).json({error})
    }
    
}
