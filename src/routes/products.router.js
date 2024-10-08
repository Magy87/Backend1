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
        const result = await Products.deleteOne({ _id: id }); 

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error eliminando el producto', error });
    }
});

router.put('/:id', uploader.single('file'), async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (req.file) {
            updates.img = `/static/img/${req.file.originalname}`;
        }

        const result = await Products.findByIdAndUpdate(id, updates, { new: true });

        if (!result) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto actualizado', product: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error actualizando el producto', error });
    }
});



export default router;





// title:String,
// description:String
// code:String
// price:Number
// status:Boolean
// stock:Number
// category:String


