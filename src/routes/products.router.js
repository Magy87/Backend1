import { Router } from "express";
//import fs from "fs/promises";
//import path from "path";
import __dirname from "../dirame.js";
import Products from "../models/Product.js";
//import crypto from 'crypto';

const router = Router();


router.get('/', async (req, res) => {
    const products = await Products.find({})
    res.json(products)
})

router.post('/', async (req, res) => {
    try {
        const body = req.body
        await Product.create(body)
        res.json({ message: 'Producto creado' })
    } catch (error) {
        res.json(error)
    }
})

export default router;
// const productsFilePath = path.join(__dirname, 'adb', 'products.json');

// router.get('/', async (req, res) => {
//     try {
//         const data = await fs.readFile(productsFilePath, 'utf-8');
//         const products = JSON.parse(data);
//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json({ message: "Error al leer el archivo de productos" });
//     }
// });

// router.get('/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const data = await fs.readFile(productsFilePath, 'utf-8');
//         const products = JSON.parse(data);
//         const product = products.find(product => product.id === id);
//         if (product) {
//             res.status(200).json(product);
//         } else {
//             res.status(404).json({ error: "Producto no encontrado" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Error al leer el archivo de productos" });
//     }
// });

// router.post('/', async (req, res) => {
//     const body = req.body;
//     try {
//         const data = await fs.readFile(productsFilePath, 'utf-8');
//         const products = JSON.parse(data);
//         if (products.some(product => product.code === body.code)) {
//             return res.status(400).json({ error: "Producto ya existente" });
//         }
//         const newProduct = {
//             id: crypto.randomUUID(), // Corregido randowUUID a randomUUID
//             ...body
//         };
//         products.push(newProduct);
//         await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
//         res.status(201).json({ message: "Producto creado exitosamente" });
//     } catch (error) {
//         res.status(500).json({ message: "Error al leer o escribir el archivo de productos" });
//     }
// });

// router.patch('/:id', async (req, res) => {
//     const { id } = req.params;
//     const body = req.body;
//     try {
//         const data = await fs.readFile(productsFilePath, 'utf-8');
//         const products = JSON.parse(data);
//         const index = products.findIndex(product => product.id === id);
//         if (index === -1) {
//             return res.status(404).json({ error: "Producto no encontrado" });
//         }
//         products[index] = { ...products[index], ...body };
//         await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
//         res.status(200).json({ message: "Producto actualizado exitosamente" });
//     } catch (error) {
//         res.status(500).json({ message: "Error al leer o escribir el archivo de productos" });
//     }
// });

// router.delete('/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const data = await fs.readFile(productsFilePath, 'utf-8');
//         const products = JSON.parse(data);
//         const index = products.findIndex(product => product.id === id);
//         if (index === -1) {
//             return res.status(404).json({ error: "Producto no encontrado" });
//         }
//         const newProducts = products.filter(product => product.id !== id);
//         await fs.writeFile(productsFilePath, JSON.stringify(newProducts, null, 2));
//         res.status(200).json({ message: "Producto eliminado" });
//     } catch (error) {
//         res.status(500).json({ message: "Error al leer o escribir el archivo de productos" });
//     }
// });





// title:String,
// description:String
// code:String
// price:Number
// status:Boolean
// stock:Number
// category:String


