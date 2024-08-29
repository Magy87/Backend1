import express from 'express';
import usersRouter from './routes/users.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js'; // Asegúrate de importar el router de carritos

import __dirname from './utils.js';
import receptorMiddleware from './middlewares/receptor.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(receptorMiddleware);

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter); 
