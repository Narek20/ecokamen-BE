import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUser,
  login,
  updateUser,
} from './User.api.handlers';
import { verifyToken } from '../../middleware/auth.middleware';

const router = Router();

router.post('/login', login);
router.post('/register', createUser);
router.get('/', verifyToken, getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
