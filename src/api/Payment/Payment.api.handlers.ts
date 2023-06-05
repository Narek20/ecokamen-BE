import { Request, Response } from 'express';
// import { Order } from '../../models/Order';
// import { OrderState } from '../../models/Order';
// import  { YooCheckout, ICreatePayment  } from '@a2seven/yoo-checkout'

export const createPayment = async (req: Request, res: Response) => {
  // try {
  //   const checkout = new YooCheckout({ shopId: 'your_shopId', secretKey: 'your_secretKey' });

  //   const {value, currency} = req.body

  //   const createPayload: ICreatePayment = {
  //     amount: {
  //         value: '2.00',
  //         currency: 'RUB'
  //     },
  //     payment_method_data: {
  //         type: 'bank_card'
  //     },
  //     confirmation: {
  //         type: 'redirect',
  //         return_url: 'test'
  //     }
  // };

  // const payment = await checkout.createPayment(createPayload, idempotenceKey)

  //   res.json({ paymentId: id, confirmation }); // Send the payment ID and confirmation to the frontend
  // } catch (error) {
  //   console.error('Payment creation error:', error);
  //   res.status(500).json({ error: 'Failed to create payment' });
  // }
};
