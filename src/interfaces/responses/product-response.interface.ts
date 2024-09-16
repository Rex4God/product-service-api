import { IProduct } from '../product.interface';

export interface ProductResponse {
  status: 'success' | 'error';  
  data?: IProduct | IProduct[] | null; 
  message?: string;  
  statusCode?: any | 200;
  error?: any;
  paginateData?: any;
  currentPage?: number;
  totalPages?: number
  totalProducts?: any
  
}
