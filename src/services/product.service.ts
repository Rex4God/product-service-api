import Product from '../models/product.model';
import { CreateProductDTO } from '../dto/create-product.dto';
import { UpdateProductDTO } from '../dto/update-product.dto';
import { ProductResponse } from '../interfaces/responses/product-response.interface';
import * as productValidator from '../validators/product.validator';
import { StatusCodes } from 'http-status-codes';



export const createProduct = async ( data: CreateProductDTO)
: Promise<ProductResponse> => {
  try {
    const validatorError = await productValidator.createProduct(data);

    if (validatorError) {
      return {
        status: 'error',
        message: validatorError,
        statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
      };
    }
    const product = new Product(data);
    const savedProduct = await product.save();
    return {
      status: 'success',
      data: savedProduct,
      statusCode: StatusCodes.CREATED,
    };
  } catch (e) {
    console.log('An unknown error has occurred. Please try again later' + e);
    return {
      status: 'error',
      data: null,
      message: 'Failed to create product',
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};

export const getProduct = async (productId: string)
: Promise<ProductResponse> => {
  try {
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return {
        status: 'error',
        message: 'Product not found',
        statusCode: StatusCodes.NOT_FOUND,
      };
    }
    return {
      status: 'success',
      data: product,
      statusCode: StatusCodes.OK,
    };
  } catch (e) {
    console.log(' An unknown error has occurred. Please try again later' + e);
    return {
      status: 'error',
      message: 'Failed to retrieve product',
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};


export const getAllProducts = async (page: number = 1, limit: number = 10)
: Promise<ProductResponse> => {
  try {
    const skip = (page - 1) * limit;

    const products = await Product.find({}).skip(skip).limit(limit);

    const totalProducts = await Product.countDocuments();

    return {
      status: 'success',
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        paginateData:products,
    
      statusCode: StatusCodes.OK,
    };
  } catch (e) {
    console.error('An unknown error has occurred. Please try again later: ', e);
    return {
      status: 'error',
      data: null,
      message: 'Failed to fetch products',
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};


export const updateProduct = async (productId: string,  data: UpdateProductDTO): Promise<ProductResponse> => {
  try {
    
    const validatorError = await productValidator.updateProduct(data);
    if (validatorError) {
      return {
        status: 'error',
        message: validatorError,
        statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
      };
    }

    
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return {
        status: 'error',
        message: 'Product not found',
        statusCode: StatusCodes.NOT_FOUND,
      };
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      data,
      { new: true }
    );

    return {
      status: 'success',
      data: updatedProduct,
      statusCode: StatusCodes.OK,
    };
  } catch (e) {
    console.error('An unknown error has occurred: ', e);
    return {
      status: 'error',
      data: null,
      message: 'Failed to update product',
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};

export const deleteProduct = async (productId: string)
: Promise<ProductResponse> => {
  try {
   const product = await Product.findOne({_id: productId});
   if(!product){
    return{
      status: 'error',
      message: "Product not found. Hence it can't be deleted",
      statusCode: StatusCodes.NOT_FOUND
    }
   };
   await Product.deleteMany({_id: productId});

   return{
    status: "success",
    data: product,
    statusCode: StatusCodes.OK
   }
  } catch (e) {
    console.log("An unknown error has occurred. Please try again later"+e)
    return {
      status: 'error',
      data: null,
      message: 'Failed to delete product',
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR
    };
  }
};
