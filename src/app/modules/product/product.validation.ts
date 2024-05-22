import Joi from 'joi';

// // Zoi validation schema

// const variantSchema = z.object({
//   type: z.string({ message: 'Type is required.' }),
//   value: z.string({ message: 'Value is required.' }),
// });

// const inventorySchema = z.object({
//   quantity: z.number({ message: 'Quantity is required must be number.' }),
//   inStock: z.boolean({ message: 'InStock is required must be boolean type.' }),
// });

// export const productValidationSchema = z.object({
//   name: z.string({ message: 'Product Name is required.' }),
//   description: z.string({
//     message: 'Description is required.',
//   }),
//   price: z
//     .number()
//     .positive({ message: 'Price is required and must be positive value.' }),
//   category: z.string({ message: 'Category is required.' }),
//   tags: z.array(z.string({ message: 'Tags is required.' })),
//   variants: z
//     .array(variantSchema)
//     .nonempty({ message: 'Variants is required in array of object.' }),
//   inventory: inventorySchema,
// });

// export const validateProduct = (product: TProduct) => {
//   return productValidationSchema.safeParse(product);
// };

const joiVariantSchema = Joi.object({
  type: Joi.string().required().messages({
    'string.base': '"type" should be a type of text',
    'any.required': '"type" is a required',
  }),
  value: Joi.string().required().messages({
    'string.base': '"value" should be a type of text',
    'any.required': '"value" is a required field',
  }),
});

// Define the Joi schema for inventory
const inventoryValidationSchema = Joi.object({
  quantity: Joi.number().required().messages({
    'number.base': '"quantity" should be a type of number',
    'any.required': '"quantity" is a required field',
  }),
  inStock: Joi.boolean().required().messages({
    'boolean.base': '"inStock" should be a type of boolean',
    'any.required': '"inStock" is a required field',
  }),
});

// Define the Joi schema for the product
export const productValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': '"name" should be a type of text',
    'any.required': '"name" is a required field',
  }),
  description: Joi.string().required().messages({
    'string.base': '"description" should be a type of text',
    'any.required': '"description" is a required field',
  }),
  price: Joi.number().required().messages({
    'number.base': '"price" should be a type of number',
    'any.required': '"price" is a required field',
  }),
  category: Joi.string().required().messages({
    'string.base': '"category" should be a type of text',
    'any.required': '"category" is a required field',
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
    'any.required': '"variants" is a required field',
  }),
  inventory: inventoryValidationSchema.required().messages({
    'any.required': '"inventory" is a required field',
  }),
});
