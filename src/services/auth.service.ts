import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthDTO } from '../dto/auth.dto';
import { AuthResponse } from '../interfaces/responses/auth-response.interface';
import * as authValidator from '../validators/auth.validator';
import { StatusCodes } from 'http-status-codes';

export const register = async (authDTO: AuthDTO): Promise<AuthResponse> => {
  try {
    const validatorError = await authValidator.createUser(authDTO);

    if (validatorError) {
      return {
        status: 'error',
        message: validatorError,
        statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
      };
    }
    const userExist = await User.findOne({ email: authDTO.email }).catch(
      (err) => {
        console.log('Error: ', err);
      }
    );
    if (userExist) {
      return {
        status: 'error',
        message: 'User already exist in the database',
        statusCode: StatusCodes.CONFLICT,
      };
    }

    const hashedPassword = await bcrypt.hash(authDTO.password, 10);
    const newUser = new User({
      email: authDTO.email,
      password: hashedPassword,
    });

    await newUser.save();

    return {
      status: 'success',
      statusCode: StatusCodes.CREATED,
      message: 'User registered successfully',
    };
  } catch (e) {
    console.log("An unknown error has occurred. Please try again later"+ e)
    return {
      status: 'error',
      message: 'Registration failed',
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR, 
    };
  }
};

export const login = async (authDTO: AuthDTO): Promise<AuthResponse> => {
  try {
    const validatorError = await authValidator.loginUser(authDTO);
    if (validatorError) {
      return {
        status: 'error',
        message: validatorError,
        statusCode: StatusCodes.OK,
      };
    }
    const user = await User.findOne({ email: authDTO.email });
    if (!user || !(await bcrypt.compare(authDTO.password, user.password))) {
      return {
        status: 'error',
        message: 'Invalid credentials',
        statusCode:StatusCodes.BAD_REQUEST
      };
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });
    return {
      status: 'success',
      token,
    };
  } catch (e) {
    console.log('An unknown error has occurred. Please try again later' + e);
    return {
      status: 'error',
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};
