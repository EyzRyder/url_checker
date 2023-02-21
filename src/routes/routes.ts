import  { Router } from 'express';
import { index, getLinkData, getRegisterData, getLinkPlusRegisterData } from '../controllers/Controller'
const router = Router();

router.get('/', index);
router.post('/previewlink', getLinkData);
router.post('/registerdata', getRegisterData);
router.post('/linkplusregisterdata', getLinkPlusRegisterData);



export default router;