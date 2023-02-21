import { Request, Response } from 'express';
import { getPreviewData, getWhoIsData, getUrlRepData } from '../func/getPageData';

export const index = (req: Request, res: Response) => {
    res.send({ message: "hello" })
}

export const getLinkData = async (req: Request, res: Response) => {
    let { data } = req.body;
    const response = await getPreviewData(data);
    res.send(response);
}

export const getRegisterData = async (req: Request, res: Response) => {
    let { data } = req.body;
    let who: any = await getWhoIsData(data);
    let url: any = await getUrlRepData(data);
    const response = await { ...who, ...url };
    res.send(response);
}

export const getLinkPlusRegisterData = async (req: Request, res: Response) => {
    let { data } = req.body;
    let prev:any = await getPreviewData(data);
    let who: any = await getWhoIsData(data);
    let url: any = await getUrlRepData(data);
    const response = await { ...prev, ...who,...url };

    res.send(response);
}

