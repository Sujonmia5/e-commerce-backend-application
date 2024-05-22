import Joi from 'joi';

// // Zoi validation schema

const joiVariantSchema = Joi.object({
  type: Joi.string().required().messages({
    'string.base': '"type" should be a type of text',
    'any.required': '"type" is a required',
  }),
  value: Joi.string().required().messages({
    'string.base': '"value" should be a type of text',
    'any.required': '"value" is a required',
  }),
});

// Define the Joi schema for inventory
const inventoryValidationSchema = Joi.object({
  quantity: Joi.number().required().messages({
    'number.base': '"quantity" should be a type of number',
    'any.required': '"quantity" is a required',
  }),
  inStock: Joi.boolean().required().messages({
    'boolean.base': '"inStock" should be a type of boolean',
    'any.required': '"inStock" is a required',
  }),
});

// Define the Joi schema for the product
export const productValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': '"name" should be a type of text',
    'any.required': '"name" is a required',
  }),
  description: Joi.string().required().messages({
    'string.base': '"description" should be a type of text',
    'any.required': '"description" is a required',
  }),
  price: Joi.number().required().messages({
    'number.base': '"price" should be a type of number',
    'any.required': '"price" is a required',
  }),
  category: Joi.string().required().messages({
    'string.base': '"category" should be a type of text',
    'any.required': '"category" is a required',
  }),
  tags: Joi.array()
    .items(
      Joi.string().required().messages({
        'string.base': '"tags" should contain text values',
        'any.required': '"tags" should not contain empty values',
      }),
    )
    .required()
    .messages({
      'array.base': '"tags" should be an array',
      'any.required': '"tags" is a required field',
    }),
  variants: Joi.array().items(joiVariantSchema).required().messages({
    'array.base': '"variants" should be an array',
    'any.required': '"variants" is a required',
  }),
  inventory: inventoryValidationSchema.required().messages({
    'any.required': '"inventory" is a required',
  }),
});
