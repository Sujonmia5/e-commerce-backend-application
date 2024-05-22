import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

const getAllProductIntoDB = async () => {
  const result = await Product.find({});
  return result;
};

const getProductIntoDB = async (id: string) => {
  const result = await Product.find({ _id: id });
  return result;
};

const updateProductIntoDB = async (id: string, product: TProduct) => {
  const result = await Product.findByIdAndUpdate({ _id: id }, product);
  return result;
};

const deleteProductIntoDB = async (id: string) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

const searchProductIntoDB = async (text: string) => {
  const result = await Product.find({
    $or: [
      { name: { $regex: text, $options: 'i' } },
      { description: { $regex: text, $options: 'i' } },
      { category: { $regex: text, $options: 'i' } },
    ],
  });
  return result;
};

export const serviceProduct = {
  createProductIntoDB,
  getAllProductIntoDB,
  getProductIntoDB,
  updateProductIntoDB,
  deleteProductIntoDB,
  searchProductIntoDB,
};
