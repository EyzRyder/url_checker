import { Request, Response } from 'express';
import { getPreviewData, getWhoIsData } from '../func/setPageData';

export const index = (req: Request, res: Response) => { 
    res.send("hello")
}

export const getLinkData = async (req: Request, res: Response) => {
    let {data} = req.body;
    const response = await getPreviewData(data);
    res.send(response);
}

export const getRegisterData = async (req: Request, res: Response) => {
    let { data } = req.body;
    const response = await getWhoIsData(data);
    res.send(response);
}
