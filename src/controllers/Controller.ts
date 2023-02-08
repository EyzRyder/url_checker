import { Request, Response } from 'express';
import { getPreviewData, getWhoIsData, getUrlRepData } from '../func/getPageData';

export const index = (req: Request, res: Response) => { 
    res.send({message:"hello"})
}

export const getLinkData = async (req: Request, res: Response) => {
    let {data} = req.body;
    const response = await getPreviewData(data);
    res.send(response);
}

export const getRegisterData = async (req: Request, res: Response) => {
    let { data } = req.body;
    let response:any = await getWhoIsData(data);
    let url:any = await getUrlRepData(data);
    response["detectionsCounts"] = await url.detectionsCounts;
    res.send(response);
}

