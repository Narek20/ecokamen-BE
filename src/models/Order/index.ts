import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export enum OrderState {
  ACTIVE = 'active',
  CLOSED = 'closed',
}

export enum PaymentTypes {
  BANK_CARD = 'bank card',
  CASH = 'cash',
  SBERBANK = 'sberbank',
}

const orderSchema = new Schema(
  {
    stoneIds: {
      type: Array<mongoose.Types.ObjectId>,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      required: true,
      enum: OrderState,
    },
    quantity: {
      type: Number,
      required: true,
    },
    deliveryPrice: {
      type: Number,
      required: true,
    },
    payed: {
      type: Boolean,
      required: true,
    },
    paymentType: {
      type: String,
      required: true,
      enum: PaymentTypes,
    },
    buyerFullName: {
      type: String,
      required: true,
    },
    buyerEmail: {
      type: String,
      required: true,
    },
    buyerPhone: {
      type: String,
      required: true,
    },
    buyerAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model('Order', orderSchema);
