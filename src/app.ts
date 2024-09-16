import express from 'express';
import productRoutes from './routes/product.routes';
import authRoutes from './routes/auth.routes';
import dotenv from 'dotenv'
dotenv.config()
require('../src/db/database');  

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

export default app;
