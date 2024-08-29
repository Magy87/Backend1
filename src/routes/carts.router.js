import { Router } from "express";
import fs from "fs/promises";
import path from "path";
import __dirname from "../utils.js";

const cartsRouter = Router();
const cartsFilePath = path.join(__dirname, 'adb', 'carts.json');


cartsRouter.post('/', async (req, res) => {
    try {
        const cartsData = await fs.readFile(cartsFilePath, 'utf-8');
        const carts = JSON.parse(cartsData);

        const newId = carts.length ? carts[carts.length - 1].id + 1 : 1;
        const newCart = { id: newId, products: [] };

        carts.push(newCart);
        await fs.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));

        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});

export default cartsRouter;
