import  { Router } from 'express';
import controller from '../controllers/Controller'
const router = Router();

router.get('/', controller.index);
router.post('/previewlink', controller.getLinkData);


export default router;