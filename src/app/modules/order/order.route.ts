import express from 'express';
import { orderController } from './order.controller';

const route = express.Router();

route.post('/orders', orderController.createOrders);
route.get('/orders', orderController.getAllOrders);

export const ordersRoutes = route;
