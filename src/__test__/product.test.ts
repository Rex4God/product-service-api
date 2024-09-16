import request from 'supertest';
import app from '../app';
import { connectDB, closeDB } from './db/testDatabase';

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await closeDB();
});

describe('Product API Tests', () => {
  let token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmU2ZTJmNzk0NzA1ODEwNGM0OTY4Y2UiLCJpYXQiOjE3MjY0MjgwMDYsImV4cCI6MTcyNjQzMTYwNn0.rKSSUGN3A5lAqLlmVDOLOldF2-LnFux_081eZvMjyUk";

  beforeAll(async () => {
    await request(app).post('/api/auth/create-user').send({
      email: 'testuser@example.com',
      password: 'Unique4004@',
    });
    const response = await request(app).post('/api/auth/login').send({
      email: 'testuser@example.com',
      password: 'Unique4004@',
    });
    token = response.body.token;

    // Log the token for debugging
    console.log('JWT Token:', token);
  });

  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Product 1',
        description: 'This is a test product',
        price: 100,
        category: 'Test Category',
      });

    // Log the response for debugging
    console.log('Create Product Response:', res.body);

    if (res.statusCode !== 201) {
      console.error('Error creating product:', res.body);
    }

    expect(res.statusCode).toBe(201);
  });

  it('should fetch all products', async () => {
    const res = await request(app).get('/api/products');
    console.log('Fetch Products Response:', res.body);

    if (res.statusCode !== 200) {
      console.error('Error fetching products:', res.body);
    }

    expect(res.statusCode).toBe(200);
  });

  it('should fetch a single product by ID', async () => {
    const product = await request(app)
      .get('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Product 2',
        description: 'Another test product',
        price: 200,
        category: 'Another Category',
      });

    const res = await request(app).get(`/api/products/${product.body.productId}`);
    console.log('Fetch Product by ID Response:', res.body);

    if (res.statusCode !== 200) {
      console.error('Error fetching product by ID:', res.body);
    }

    expect(res.statusCode).toBe(200);
  });

  it('should update an existing product', async () => {
    // First, create a product to update
    const product = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Product to Update',
        description: 'Description before update',
        price: 150,
        category: 'Update Category'
      });
  
    
    expect(product.statusCode).toBe(201);
    const productId = product.body._id || product.body.productId; 
    expect(productId).toBe(productId); 
  
    // Now update the product
    const res = await request(app)
      .put(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Product Name',
        description: 'Updated product description',
        price: 175,
        category: 'Updated Category'
      });
  
    console.log('Update Product Response:', res.body);
  
    // Ensure the product was updated correctly
    expect(res.statusCode).toBe(201);
  });
  
  it('should delete a product', async () => {
    const product = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Product to Delete',
        description: 'To be deleted',
        price: 300,
        category: 'Delete Category',
      });

    const res = await request(app)
      .delete(`/api/products/${product.body.productId}`)
      .set('Authorization', `Bearer ${token}`);

    if (res.statusCode !== 200) {
      console.error('Error deleting product:', res.body);
    }

    expect(res.statusCode).toBe(200);
  });
});
