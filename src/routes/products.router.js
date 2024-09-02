import { Router } from "express";
import fs from "fs/promises";
import path from "path";
import __dirname from "../utils.js";

const productsRouter = Router();
const productsFilePath = path.join(__dirname, 'adb', 'products.json');

productsRouter.get('/', async (req, res) => {
    try {
        const productsData = await fs.readFile(productsFilePath, 'utf-8');
        const products = JSON.parse(productsData);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

productsRouter.post('/', async (req, res) => {
    try {
        const productsData = await fs.readFile(productsFilePath, 'utf-8');
        const products = JSON.parse(productsData);

        const newId = products.length ? products[products.length - 1].id + 1 : 1;
        const newProduct = { id: newId, ...req.body };

        products.push(newProduct);
        await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});

productsRouter.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productsData = await fs.readFile(productsFilePath, 'utf-8');
        let products = JSON.parse(productsData);

        const productIndex = products.findIndex(product => product.id == id);
        if (productIndex === -1) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        products[productIndex] = { ...products[productIndex], ...req.body };
        await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));

        res.json(products[productIndex]);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

productsRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productsData = await fs.readFile(productsFilePath, 'utf-8');
        let products = JSON.parse(productsData);

        products = products.filter(product => product.id != id);
        await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

export default productsRouter;
