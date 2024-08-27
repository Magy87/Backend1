import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cartsFilePath = path.join(__dirname, '../../carts.json');
const productsFilePath = path.join(__dirname, '../../products.json');

router.post('/', (req, res) => {
  const carts = JSON.parse(fs.readFileSync(cartsFilePath, 'utf-8'));
  const newCart = {
    id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1,
    products: [],
  };
  carts.push(newCart);
  fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
  res.status(201).json(newCart);
});


router.get('/:cid', (req, res) => {
  const carts = JSON.parse(fs.readFileSync(cartsFilePath, 'utf-8'));
  const cart = carts.find(c => c.id === parseInt(req.params.cid));
  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ message: 'Cart not found' });
  }
});


router.post('/:cid/product/:pid', (req, res) => {
  const carts = JSON.parse(fs.readFileSync(cartsFilePath, 'utf-8'));
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  const cart = carts.find(c => c.id === parseInt(req.params.cid));
  const product = products.find(p => p.id === parseInt(req.params.pid));
  
  if (cart && product) {
    const existingProduct = cart.products.find(p => p.product === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: product.id, quantity: 1 });
    }
    fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
    res.status(201).json(cart);
  } else {
    res.status(404).json({ message: 'Cart or product not found' });
  }
});

module.exports = router;
