import mongoose from 'mongoose';

enum OrderState {
  OPEN = 'open',
  CLOSE = 'close',
}

interface IOrder extends mongoose.Document {
  title: string | null;
  price: number | null;
  state: OrderState;
  quantity: number;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    title: {
      type: String,
      default: null,
      required: true
    },
    price: {
      type: Number,
      default: null,
      required: true
    },
    state: {
      type: String,
      default: OrderState.OPEN,
      enum: Object.values(OrderState),
      required: true

    },
    quantity: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OrderInterface = mongoose.model<IOrder>('Order', orderSchema);

export { OrderInterface, IOrder };
