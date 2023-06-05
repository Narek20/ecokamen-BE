import { Router } from 'express';
import {
  placeOrder,
  removeOrder,
  getOrderById,
  getCurrentOrders,
  getOrdersHistory,
} from './Order.api.handlers';

const router = Router();

router.get('/:userId', getCurrentOrders);
router.get('/history/:userId', getOrdersHistory);
router.get('/one/:orderId', getOrderById);
router.post('/', placeOrder);
router.delete('/:orderId', removeOrder);

export default router;
