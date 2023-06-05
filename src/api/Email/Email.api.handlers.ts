import { Request, Response } from 'express';
import { Basket } from '../../models/Basket';
import { SendEmail } from '../../services/Sendgrid';
import { Email } from '../../models/Emails';

export const sendEmail = async (req: Request, res: Response) => {
  try {
    const { to, subject, text } = req.body;

    const data = await SendEmail(to, subject, text);

    return res.send({
      success: true,
      data: data,
      message: 'Email успешно отправлен',
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message, success: false });
  }
};

export const subscribeForNews = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const data = await Email.findOne({ email });

    if (data) {
      return res
        .status(400)
        .json({ message: 'Email уже зарегистрирован', success: false });
    }

    const newEmail = await Email.create({ email });

    return res.send({
      success: true,
      data: newEmail,
      message: 'Email успешно зарегистрирован',
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message, success: false });
  }
};
