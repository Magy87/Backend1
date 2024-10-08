import { Router } from "express";
//import fs from "fs/promises";
//import path from "path";
import __dirname from "../dirname.js";
import Products from "../models/Product.js";
import { uploader } from "../utils/multer.js";

//import crypto from 'crypto';

const router = Router();


router.get('/', async (req, res) => {
    const products = await Products.find({})
    res.json(products)
})


router.post('/', uploader.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ status: "error", error: "no se puede guardar la imagen" });
        }

        const body = req.body;
      
        body.img = `/static/img/${req.file.originalname}`; 


        await Products.create(body);
        res.json({ message: 'Producto creado' });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ status: "error", error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Products.deleteOne({ _id: id });  // Usar "Products" en lugar de "Product"

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error eliminando el producto', error });
    }
});




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


