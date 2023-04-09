import { Request, Response } from 'express';
import { getPreviewData, getWhoIsData, getUrlRepData } from '../func/getPageData';

export const index = (req: Request, res: Response) => {
    res.send({ message: "hello" })
}

export const getLinkData = async (req: Request, res: Response) => {
    let { data } = req.body;

    data = data.replace("http://", "");
    data = data.replace("https://", "");
    data = data.replace("www.", "");
    data = data.replace(".com", "");
    data = data.replace(".com/", "");

    const response = await getPreviewData(data);
    res.send(response);
}

export const getRegisterData = async (req: Request, res: Response) => {
    let { data } = req.body;
    data = data.replace("http://", "");
    data = data.replace("https://", "");
    data = data.replace("www.", "");
    let url: any = await getUrlRepData(data);
    let who: any = await getWhoIsData(data);
    const response = await { ...url, ...who };
    res.send(response);
}

export const getLinkPlusRegisterData = async (req: Request, res: Response) => {
    let { data } = req.body;
    data = data.replace("http://", "");
    data = data.replace("https://", "");
    data = data.replace("www.", "");

    let prev: any = await getPreviewData(data);
    let url: any = await getUrlRepData(data);
    let who: any = await getWhoIsData(data);
    const response = await { ...prev, ...who,...url };

    res.send(response);
}

