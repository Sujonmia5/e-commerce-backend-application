import { TOrder } from './order.interface';
import { Orders } from './order.model';

const createOrdersIntoDB = async (order: TOrder) => {
  const product = new Orders(order);
  const result = product.save();
  return result;
};
const getAllOrdersIntoDB = async () => {
  const result = await Orders.find({});
  return result;
};
const getOrdersEmailIntoDB = async (email: string) => {
  const result = await Orders.find({ email });
  return result;
};

export const orderService = {
  createOrdersIntoDB,
  getAllOrdersIntoDB,
  getOrdersEmailIntoDB,
};
