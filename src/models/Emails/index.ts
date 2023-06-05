import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;


const emailSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Email = mongoose.model('Email', emailSchema);
