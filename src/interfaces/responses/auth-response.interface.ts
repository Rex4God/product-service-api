export interface AuthResponse {
    status: 'success' | 'error';
    token?: string; 
    message?: string; 
    statusCode?: any
    data?: any
  }
  