import { Router } from 'express';
import {
  getBasketItems,
  addBasketItem,
  updatebasketItem,
  removeBasketItem,
  removeAllBasketItems,
} from './Basket.api.handlers';

const router = Router();

router.get('/:id', getBasketItems);
router.post('/', addBasketItem);
router.put('/', updatebasketItem);
router.delete('/:userId', removeAllBasketItems);
router.delete('/:userId/:stoneId', removeBasketItem);

export default router;
