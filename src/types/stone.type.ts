import mongoose, { SchemaDefinitionProperty } from 'mongoose';

interface IStone extends mongoose.Document {
  title: string;
  description: string;
  category: string;
  imageHrefs: SchemaDefinitionProperty<String[]>;
  texture: string;
  price: string;
  thickness: string;
  usage: string;
  searchName: string;
  searchCategory: string;
}

const stoneSchema = new mongoose.Schema<IStone>(
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

const StoneInterface = mongoose.model<IStone>('Order', stoneSchema);

export { StoneInterface, IStone };
