import { TOrder } from './order.interface';
import { Orders } from './order.model';

const createOrdersIntoDB = async (order: TOrder) => {
  const product = new Orders(order);
  const result = product.save();
  return result;
};
const getAllOrdersIntoDB = async (email: string | null) => {
  if (email === null) {
    const result = await Orders.find({});
    return result;
  }
  const result = await Orders.find({ email });
  return result;
};

export const orderService = {
  createOrdersIntoDB,
  getAllOrdersIntoDB,
};
