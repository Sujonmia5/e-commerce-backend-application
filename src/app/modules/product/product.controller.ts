import { NextFunction, Request, Response } from 'express';
import { TProduct } from './product.interface';
import { serviceProduct } from './product.service';
import { productValidationSchema } from './product.validation';

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data: TProduct = req.body;

    const { error, value } = productValidationSchema.validate(data);
    if (error) {
      res.status(500).json({
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

const getAllProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    if (searchTerm) {
      const result = await serviceProduct.searchProductIntoDB(searchTerm);

      if (!result.length) {
        const err = new Error('Products not founded');
        return next(err);
      }
      res.status(200).json({
        success: true,
        message: `Products matching search term ${searchTerm} fetched successfully!`,
        data: result,
      });
    } else {
      const result = await serviceProduct.getAllProductIntoDB();
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
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
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: null,
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
