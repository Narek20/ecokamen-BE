import { Router } from 'express';
import { createPayment } from './Payment.api.handlers';

const router = Router();

router.post('/create', createPayment);

export default router;
