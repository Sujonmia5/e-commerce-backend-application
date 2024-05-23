/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { TProduct } from './product.interface';
import { serviceProduct } from './product.service';
import { productValidationSchema } from './product.validation';

//product creation controller
const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data: TProduct = req.body;
    // joi validation schema call
    const { error, value } = productValidationSchema.validate(data);
    if (error) {
      const err = new Error(`Product not created! ${error.message}`);
      return next(err);
    }
    const result = await serviceProduct.createProductIntoDB(value);
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

//get all product controller
const getAllProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // single product get start
    const query = req.query;
    const searchTerm = req?.query?.searchTerm as string;
    if (searchTerm) {
      const result = await serviceProduct.getAllProductIntoDB(searchTerm);
      // console.log(result);
      if (!result.length) {
        return next(new Error('Products not founded'));
      }
      res.status(200).json({
        success: true,
        message: `Products matching search term ${searchTerm} fetched successfully!`,
        data: result,
      });
    } // single product get completed
    else if (Object.keys(query).length === 0) {
      const result = await serviceProduct.getAllProductIntoDB(null);
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    } else {
      return next(new Error('product not founded'));
    }
  } catch (err: any) {
    next(err);
  }
};

//get product by id controller
const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.productId;
    const result = await serviceProduct.getProductIntoDB(id);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    }
    next(new Error('Products not founded'));
  } catch (err: any) {
    next(err);
  }
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.productId;
    const product = req.body;

    // product Update error check
    const { error } = productValidationSchema.validate(product, {
      abortEarly: false,
    });
    const errorData = error?.details.reverse()[0];
    if (errorData?.message.includes('not allowed')) {
      return next(new Error(`${errorData?.message}`));
    }
    // final data updated
    const result = await serviceProduct.updateProductIntoDB(id, product);
    if (result) {
      // console.log(result);
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    }
    return next(new Error('Product not founded'));
  } catch (err: any) {
    next(err);
  }
};

// delete product
const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.productId;
    const result = await serviceProduct.deleteProductIntoDB(id);
    if (!result.deletedCount) {
      return next(new Error('Products not founded'));
    }
    res.status(200).json({
      success: true,
      message: 'Products deleted successfully!',
    });
  } catch (err: any) {
    next(err);
  }
};

export const ProductController = {
  createProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
