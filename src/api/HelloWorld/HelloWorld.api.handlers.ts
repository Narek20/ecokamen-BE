import { Request, Response } from 'express';


export const hello = async (req: Request, res: Response) => {
  try {
    res.send("Hey guys")
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({ error: 'Failed to create payment' });
  }
};
