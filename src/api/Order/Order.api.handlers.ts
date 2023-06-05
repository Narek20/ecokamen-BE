import { Request, Response } from 'express';
import { Order } from '../../models/Order';
import { OrderState } from '../../models/Order';

export const getCurrentOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const items = await Order.find({ userId, state: OrderState.ACTIVE }).lean();

    return res.send({
      success: true,
      data: items,
      message: 'Заказы успешно получены',
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message, success: false });
  }
};

export const getOrdersHistory = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const items = await Order.find({ userId, state: OrderState.CLOSED }).lean();

    return res.send({
      success: true,
      data: items,
      message: 'Заказы успешно получены',
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message, success: false });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const item = await Order.findOne({ _id: orderId });

    if (!item) {
      return res.status(400).json({
        success: false,
        message: `Заказов с orderId: ${orderId} не существует`,
      });
    }

    return res.send({
      success: true,
      data: item,
      message: 'Заказ успешно получен',
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message, success: false });
  }
};

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const {
      deliveryDetails,
      paymentDetails,
      personalDetails,
      productIds,
      totalPrice,
      userId,
    } = req.body;

    if (
      !deliveryDetails ||
      !paymentDetails ||
      !personalDetails ||
      !productIds.length ||
      !userId
    ) {
      return res.send({
        success: false,
        message: 'недействительные данные заказа',
      });
    }

    const newItem = await Order.create({
      buyerAddress: personalDetails.address,
      buyerEmail: personalDetails.email,
      buyerPhone: personalDetails.phone,
      buyerFullName: personalDetails.fullName,
      deliveryPrice: +deliveryDetails,
      payed: false,
      stoneIds: productIds,
      paymentType: paymentDetails,
      state: OrderState.ACTIVE,
      quantity: productIds.length,
      price: +totalPrice,
      userId: userId,

    });

    return res.send({
      success: true,
      data: newItem,
      message: 'Предмет успешно заказано',
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message, success: false });
  }
};

export const removeOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const item = await Order.findOne({ orderId });

    if (!item) {
      return res.status(400).json({
        success: false,
        message: `Заказов с orderId: ${orderId} не существует`,
      });
    }

    await Order.findOneAndRemove({ orderId });

    return res.send({
      success: true,
      data: [],
      message: 'Предмет успешно удален',
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message, success: false });
  }
};
