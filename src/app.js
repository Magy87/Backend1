import express from 'express';
import productsRouter from './api/products/productsRouter.js';
import cartsRouter from './api/carts/cartsRouter.js';

const app = express();

app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

export default app;
