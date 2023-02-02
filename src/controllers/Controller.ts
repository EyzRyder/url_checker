import { Request, Response } from 'express';
import { setPreview } from '../func/setPreview';

const index = (req: Request, res: Response) => { 
    res.send("hello")
}

const getLinkData = async (req: Request, res: Response) => {
    let {data} = req.body;
    const response = await setPreview(data);
    res.send(response);
}

export default {
    index,
    getLinkData
}