/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';
import { Product } from '../product/product.model';

//main orders schema
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

// orderSchema pre function when orders data save
orderSchema.pre('save', async function (next) {
  try {
    const { productId, quantity } = this;
    const product = await Product.findOne({ _id: productId });

    if (product === null) {
      const err = new Error('This product not available');
      return next(err);
    }

    if (product.inventory.quantity < quantity) {
      const err = new Error('Insufficient quantity available in inventory');
      return next(err);
    }
    product.inventory.quantity -= quantity;
    await Product.updateOne({ _id: productId }, product);

    next();
  } catch (error: any) {
    next(error);
  }
});

orderSchema.post('save', async function (doc, next) {
  try {
    const { productId } = doc;
    const product = await Product.findOne({ _id: productId });
    if (product) {
      const quantity = product.inventory.quantity;
      if (quantity === 0) {
        product.inventory.inStock = false;
        await Product.updateOne({ _id: productId }, product);
      }
      next();
    }
  } catch (error: any) {
    next(error);
  }
});

export const Orders = model<TOrder>('order', orderSchema);
