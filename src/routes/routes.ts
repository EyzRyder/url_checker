import  { Router } from 'express';
import { index, getLinkData, getRegisterData } from '../controllers/Controller'
const router = Router();

router.get('/', index);
router.post('/previewlink', getLinkData);
router.post('/registerdata', getRegisterData);


export default router;