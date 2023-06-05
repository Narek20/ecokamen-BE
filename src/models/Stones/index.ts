import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const stoneSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    imageHrefs: {
      type: Array<String>,
      required: true,
    },
    texture: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    thickness: {
      type: String,
    },
    usage: {
      type: String,
      required: true,
    },
    searchName: {
      type: String,
      required: true,
    },
    searchCategory: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

stoneSchema.index({ searchName: 'text' });

export const Stone = mongoose.model('Stone', stoneSchema);
