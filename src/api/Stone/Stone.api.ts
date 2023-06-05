import { Router } from 'express';
import {
  getByName,
  getByCategory,
  addStone,
  searchStonesByName
} from './Stone.api.handlers';

const router = Router();

router.get('/:name', getByName);
router.get('/category/:category', getByCategory);
router.get('/search/:searchKey', searchStonesByName);
router.post('/', addStone);

export default router;
