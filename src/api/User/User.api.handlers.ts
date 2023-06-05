import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from '../../models/User';
import { IExtendedRequest } from '../../types/interfaces/request.interface';
import env from '../../utils/constants/env';
import { encrypt } from '../../utils/password/functions';

const encryptionKey = '87asgd8asgd';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !env.tokenKey) {
      return res.status(400).json({
        success: false,
        message: `Пользователь с Email: ${email} не суйшествует`,
      });
    }

    if (user.password !== encrypt(password, encryptionKey)) {
      return res.status(400).json({
        success: false,
        message: `Неверный пароль`,
      });
    }

    const token = jwt.sign(password, env.tokenKey);

    return res.send({
      success: true,
      token,
      data: user,
      message: 'Пользователь успешно авторизовался',
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message, success: false });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name, surname, patronymic, phone } = req.body;

    if (!email || !password || !name || !surname || !patronymic || !phone) {
      return res.status(400).json({
        success: false,
        message: `Пожалуйста, заполните все поля`,
      });
    }

    const isUserExist = await User.findOne({
      email,
    });

    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: `Пользователь с email: ${email} уже существует`,
      });
    }

    const user = await User.create({
      ...req.body,
      password: encrypt(password, encryptionKey),
    });

    return res.json({
      success: true,
      message: 'Пользователь успешно создан',
      data: user,
    });
  } catch (err: any) {
    res.send({ success: false, message: err.message });
  }
};

export const getUser = async (req: IExtendedRequest, res: Response) => {
  try {
    if (!req.decodedToken) {
      return res
        .status(400)
        .json({ success: false, message: 'Id is not provided' });
    }

    const user = await User.findOne({
      password: encrypt(req.decodedToken, encryptionKey),
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'User not found' });
    }

    return res.json({ success: true, data: user });
  } catch (err: any) {
    res.status(500).json({ message: err.message, success: false });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { fullName, phone, email } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: 'Id is not provided' });
    }

    const isUserExist = await User.findOne({ _id: id });

    if (!isUserExist) {
      return res
        .status(400)
        .json({ success: false, message: 'User not found' });
    }

    const [surname, name, patronymic] = fullName.split(' ');

    const user = {
      name,
      surname,
      patronymic,
      phone,
      email,
    };

    const result = await User.updateOne({ _id: id }, { $set: user });

    return res.json({
      success: true,
      data: result,
      message: 'Пользователь успешно обновлен',
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message, success: false });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: 'Id not provided' });
    }

    const isUserExist = await User.findOne({ _id: id });

    if (!isUserExist) {
      return res
        .status(400)
        .json({ success: false, message: 'User not found' });
    }

    await User.deleteOne({ _id: id });

    return res.json({ success: true, message: 'Пользователь успешно удален' });
  } catch (err: any) {
    res.status(500).json({ message: err.message, success: false });
  }
};
