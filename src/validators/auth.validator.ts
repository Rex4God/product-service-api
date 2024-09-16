import Joi from 'joi';
import { validate } from '../utils/helpers';

interface UserBody {
  email: string;
  password: string;
}

export const createUser = async (body: UserBody) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'string.empty': 'Email is required',
    }),
    password: Joi.string()
      .min(8)
      .max(15)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/)
      .required()
      .messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password cannot exceed 15 characters',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        'string.empty': 'Password is required',
      }),
  });

  return validate(schema, body);
};

interface LoginBody {
    email: string;
    password: string;
  }
  
  export const loginUser = async (data: LoginBody) => {
    const schema = Joi.object({
      email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'string.empty': 'Email is required',
      }),
      password: Joi.string().required().messages({
        'string.empty': 'Password is required',
      }),
    });
  
    return validate(schema, data);
  };