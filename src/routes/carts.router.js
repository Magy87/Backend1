import { Router } from "express";
import fs from "fs/promises";
import path from "path";
import __dirname from "../utils.js";

const cartsRouter = Router();

const cartsFilePath = path.join(__dirname, 'adb', 'carts.json');
cartsRouter.post('/:cartId/product/:productId', async (req, res) => {
    try {
        const { cartId, productId } = req.params;

        const cartsData = await fs.readFile(cartsFilePath, 'utf-8');
        const carts = JSON.parse(cartsData);

        const cart = carts.find(c => c.id == cartId);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        const productsFilePath = path.join(__dirname, 'adb', 'products.json');
        const productsData = await fs.readFile(productsFilePath, 'utf-8');
        const products = JSON.parse(productsData);
o
        const product = products.find(p => p.id == productId);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        cart.products.push(product);
        await fs.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
});

cartsRouter.get('/:cartId', async (req, res) => {
    try {
        const { cartId } = req.params;

        const cartsData = await fs.readFile(cartsFilePath, 'utf-8');
        const carts = JSON.parse(cartsData);

        const cart = carts.find(c => c.id == cartId);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
});

export default cartsRouter