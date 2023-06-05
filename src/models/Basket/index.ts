import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const basketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageHref: {
      type: String,
      required: true,
    },
    pageLink: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    thickness: {
      type: String,
      required: false,
    },
    quantity: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    stoneId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Basket = mongoose.model('Basket', basketSchema);
