import { Router } from 'express';
import { sendEmail, subscribeForNews } from './Email.api.handlers';

const router = Router();

router.post('/', sendEmail);
router.post('/subscribe', subscribeForNews);

export default router;
