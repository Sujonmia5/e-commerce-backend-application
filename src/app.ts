/* eslint-disable @typescript-eslint/no-unused-vars */
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

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'server is working',
  });
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.url);
  res.status(400).json({
    success: false,
    message: 'Route not found',
  });
});

// global error function

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    success: false,
    message: err?.message || 'Something went wrong',
  });
});

export default app;
