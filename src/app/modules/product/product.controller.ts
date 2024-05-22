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
      return res.status(500).json({
        success: false,
        message: `Product not created! ${error?.message}`,
      });
    }
    const result = await serviceProduct.createProductIntoDB(value);
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err) {
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
        const err = new Error('Products not founded');
        return next(err);
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
      res.status(500).json({
        success: false,
        message: 'product not founded',
      });
    }
  } catch (err) {
    next(err);
  }
};

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.productId;
    const result = await serviceProduct.getProductIntoDB(id);
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (err) {
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
    const result = await serviceProduct.updateProductIntoDB(id, product);
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.productId;
    const result = await serviceProduct.deleteProductIntoDB(id);
    // console.log(result);
    res.status(200).json({
      success: true,
      message: 'Products deleted successfully!',
    });
  } catch (err) {
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
