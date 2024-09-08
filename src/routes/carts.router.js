import { Router } from "express";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto"; // Añadido para usar crypto.randomUUID
import __dirname from "../utils.js";

const cartsRouter = Router();
const cartsFilePath = 'carts.json';

cartsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fs.readFile(cartsFilePath, 'utf-8');
        const carts = JSON.parse(data);
        const cart = carts.find(cart => cart.id === id);
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: "Carrito no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al leer el archivo" });
    }
});

cartsRouter.post('/', async (req, res) => {
    try {
        const data = await fs.readFile(cartsFilePath, 'utf-8');
        const carts = JSON.parse(data);

        const newCart = {
            id: crypto.randomUUID(), // Corregido randowUUID a randomUUID
            products: []
        };
        carts.push(newCart);
        await fs.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));
        res.json({ message: "Carrito creado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al leer o escribir el archivo" });
    }
});

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const data = await fs.readFile(cartsFilePath, 'utf-8');
        const carts = JSON.parse(data);

        const updatedCarts = carts.map(cart => {
            if (cart.id === cid) {
                const index = cart.products.findIndex(product => product.id === pid);
                if (index === -1) {
                    cart.products.push({ id: pid, quantity });
                } else {
                    cart.products[index] = { id: pid, quantity: cart.products[index].quantity + quantity };
                }
                return cart;
            }
            return cart;
        });

        await fs.writeFile(cartsFilePath, JSON.stringify(updatedCarts, null, 2));
        res.json({ message: "Producto agregado al carrito" });
    } catch (error) {
        res.status(500).json({ message: "Error al leer o escribir el archivo" });
    }
});

export default cartsRouter;


