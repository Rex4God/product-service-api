import Joi from 'joi';
import { validate } from '../utils/helpers';

interface ProductBody {
  name: string;
  description: string;
  price: number;
  category: string;
}

export const createProduct = async (body: ProductBody) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
  });

  return validate(schema, body);
};

export const updateProduct = async (body: Partial<ProductBody>) => {
  const schema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    category: Joi.string(),
  }).min(1);
  return validate(schema, body);
};
