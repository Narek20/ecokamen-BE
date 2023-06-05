import { Request, Response } from 'express';
import { Basket } from '../../models/Basket';

export const getBasketItems = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const items = await Basket.find({ userId: id }).lean();

    return res.send({
      success: true,
      data: items,
      message: 'Предметы успешно получены',
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message, success: false });
  }
};

export const addBasketItem = async (req: Request, res: Response) => {
  try {
    const { userId, stoneId } = req.body;

    const item = await Basket.findOne({ userId, stoneId }).lean();

    if (item) {
      return res.status(400).json({
        success: false,
        message: `Предмет уже в корзине`,
      });
    }

    const newItem = await Basket.create({ ...req.body });

    return res.send({
      success: true,
      data: newItem,
      message: 'Предмет успешно добавлен в корзину',
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message, success: false });
  }
};

export const updatebasketItem = async (req: Request, res: Response) => {
  try {
    const { userId, stoneId } = req.body;

    const item = await Basket.findOne({ userId, stoneId });

    if (!item) {
      return res.status(400).json({
        success: false,
        message: `Предметов с userId: ${userId} и stoneId: ${stoneId} не существует`,
      });
    }

    const newItem = await Basket.findOneAndUpdate(
      { userId, stoneId },
      { ...req.body },
      { new: true }
    );

    return res.send({
      success: true,
      data: newItem,
      message: 'Предмет успешно обнавлен',
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message, success: false });
  }
};

export const removeBasketItem = async (req: Request, res: Response) => {
  try {
    const { userId, stoneId } = req.params;

    const item = await Basket.findOne({ userId, stoneId });

    if (!item) {
      return res.status(400).json({
        success: false,
        message: `Предметов с userId: ${userId} и stoneId: ${stoneId} не существует`,
      });
    }

    await Basket.findOneAndRemove({ userId, stoneId });

    const basketItems = await Basket.find({ userId });

    return res.send({
      success: true,
      data: basketItems,
      message: 'Предмет успешно удален',
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message, success: false });
  }
};

export const removeAllBasketItems = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const items = await Basket.find({ userId });

    if (!items.length) {
      return res.status(400).json({
        success: false,
        message: `Предметов с userId: ${userId} не существует`,
      });
    }
    items.forEach(async () => {
      await Basket.findOneAndRemove({ userId });
    });

    return res.send({
      success: true,
      data: [],
      message: 'Все предметы из корзины удаленные',
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message, success: false });
  }
};
