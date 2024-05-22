import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { productRouter } from './app/modules/product/product.route';
import { ordersRoutes } from './app/modules/order/order.route';
const app = express();

// parser
app.use(express.json());
app.use(cors());

// router all
app.use('/api', productRouter);
app.use('/api', ordersRoutes);

app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'Route not found',
  });
});

// global error function
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  //   console.error(err);
  res.status(500).json({
    success: false,
    message: err.message,
  });
});

export default app;
