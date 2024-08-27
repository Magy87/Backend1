import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const productsFilePath = path.join(__dirname, '../../products.json');

router.get('/', (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
  res.json(products.slice(0, limit));
});

router.get('/:pid', (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  const product = products.find(p => p.id === parseInt(req.params.pid));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});


router.post('/', (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  const newProduct = {
    id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
    ...req.body,
    status: req.body.status !== undefined ? req.body.status : true,
  };
  products.push(newProduct);
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
  res.status(201).json(newProduct);
});

router.put('/:pid', (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.pid));
  if (productIndex !== -1) {
    const updatedProduct = { ...products[productIndex], ...req.body, id: products[productIndex].id };
    products[productIndex] = updatedProduct;
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

router.delete('/:pid', (req, res) => {
  let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.pid));
  if (productIndex !== -1) {
    products = products.filter(p => p.id !== parseInt(req.params.pid));
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

export default productRouter;
