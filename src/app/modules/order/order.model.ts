import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';
import { Product } from '../product/product.model';
import { NextFunction } from 'express';

export const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

orderSchema.pre('save', async function (next) {
  const { productId, quantity } = this;

  const product = await Product.findOne({ _id: productId });
  if (product === null) {
    const err = new Error('this product not available');
    return next(err);
  } else if (product) {
    if (product.inventory.quantity < quantity) {
      const err = new Error('Insufficient quantity available in inventory');
      return next(err);
    }
    product.inventory.quantity -= quantity;
    const result = await Product.updateOne({ _id: productId }, product);
  }
  next;
});

orderSchema.post('save', async function (doc, next) {
  const { productId } = doc;
  const product = await Product.findOne({ _id: productId });
  if (product) {
    const quantity = product.inventory.quantity;
    if (quantity === 0) {
      product.inventory.inStock = false;
      const result = await Product.updateOne({ _id: productId }, product);
    }
    next;
  }
});

export const Orders = model<TOrder>('order', orderSchema);
