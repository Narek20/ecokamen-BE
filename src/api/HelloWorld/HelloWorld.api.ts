import { Router } from 'express';
import { hello } from './HelloWorld.api.handlers';

const router = Router();

router.post('/', hello);

export default router;
