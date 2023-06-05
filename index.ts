import express from 'express';
import cors from 'cors';
import * as mongoose from 'mongoose';
import * as bodyparser from 'body-parser';
import UserRouter from './src/api/User';
import StoneRouter from './src/api/Stone';
import BasketRouter from './src/api/Basket';
import OrdersRouter from './src/api/Order';
import PaymentRouter from './src/api/Payment';
import EmailRouter from './src/api/Email';
import env from './src/utils/constants/env';

const app = express();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true, limit: '30mb' }));
app.use(bodyparser.json({ limit: '30mb' }));

mongoose
  .connect(env.mongoUrl || '', {
    autoIndex: true,
  })
  .then(() => {
    console.log('Mongodb Live');
  })
  .catch((e) => {
    console.log('Mongodb Down', e);
  });

app.use(express.static('public'));

// Initilize routers
app.use('/users', UserRouter);
app.use('/stones', StoneRouter);
app.use('/orders', OrdersRouter);
app.use('/basket', BasketRouter);
app.use('/payment', PaymentRouter);
app.use('/email', EmailRouter);

app.listen(env.port || 8080, () => {
  console.log('Server running on port 8080');
});
