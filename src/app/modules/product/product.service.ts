import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

const getAllProductIntoDB = async (text: string | null) => {
  if (text === null) {
    const result = await Product.find({});
    return result;
  }
  console.log(text);
  const result = await Product.find({
    $or: [
      { name: { $regex: text, $options: 'i' } },
      { description: { $regex: text, $options: 'i' } },
      { category: { $regex: text, $options: 'i' } },
    ],
  });
  return result;
};

const getProductIntoDB = async (id: string) => {
  const result = await Product.findById({ _id: id });
  return result;
};

// const searchProductIntoDB = async (text: string) => {};

const updateProductIntoDB = async (id: string, product: TProduct) => {
  const result = await Product.findByIdAndUpdate({ _id: id }, product);
  if (result?._id) {
    const data = await Product.findOne({ _id: id });
    return data;
  }
  return {};
};

const deleteProductIntoDB = async (id: string) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

export const serviceProduct = {
  createProductIntoDB,
  getAllProductIntoDB,
  getProductIntoDB,
  updateProductIntoDB,
  deleteProductIntoDB,
};
