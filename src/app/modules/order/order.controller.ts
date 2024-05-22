import { Request, Response } from 'express';
import { TOrder } from './order.interface';
import { orderService } from './order.service';

const createOrders = async (req: Request, res: Response) => {
  try {
    const orderData: TOrder = req.body;

    const result = await orderService.createOrdersIntoDB(orderData);
    // console.log(result);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Insufficient quantity available in inventory',
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    let result: any = null;
    console.log(query);
    if (Object.keys(query).length === 0) {
      const orders = await orderService.getAllOrdersIntoDB();
      result = orders;
      return res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      });
    } else if (query.email) {
      const order = await orderService.getOrdersEmailIntoDB(
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
      res.status(500).json({
        success: false,
        message: 'Orders Not found',
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Orders fetched not successfully!',
    });
  }
};

export const orderController = {
  createOrders,
  getAllOrders,
};
