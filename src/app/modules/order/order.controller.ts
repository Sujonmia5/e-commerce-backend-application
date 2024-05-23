import { NextFunction, Request, Response } from 'express';
import { TOrder } from './order.interface';
import { orderService } from './order.service';
import { orderValidationSchema } from './order.validation';

// order creation controller
const createOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orderData: TOrder = req.body;
    const { error, value } = orderValidationSchema.validate(orderData);
    // console.log(error);
    if (error) {
      return res.status(400).json({
        success: false,
        message: `Order  not created! ${error?.message}`,
      });
    }
    const result = await orderService.createOrdersIntoDB(value);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err) {
    // console.log(err, 'order create');
    // res.status(400).send(e);
    next(err);
  }
};

// get all orders controller
const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = req.query;
    let result = null;
    // get orders api
    if (Object.keys(query).length === 0) {
      const orders = await orderService.getAllOrdersIntoDB(null);
      if (!orders.length) {
        return res.status(400).json({
          success: false,
          message: 'Orders Not found',
        });
      }
      result = orders;
      return res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      });
    } else if (query.email) {
      // get orders with email query
      const order = await orderService.getAllOrdersIntoDB(
        query?.email as string,
      );
      if (!order.length) {
        return res.status(500).json({
          success: false,
          message: 'Order not found',
        });
      }
      result = order;
      return res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Orders Not found',
      });
    }
  } catch (err) {
    next(err);
  }
};

// orders controller object
export const orderController = {
  createOrders,
  getAllOrders,
};
