import { Router } from "express"
import Product from "../models/Product.js";
//import fs from 'fs'
//import { isDataView } from "util/types"

const router = Router()

router.get('/', async (req, res) => {
    try {
        const products = await Product.find({})
        res.render('index', { products })
    } catch (error) {
        res.json(error)
    }
});

router.get('/create-product', async (req, res) => {
    res.render('create-product')

});


router.get('/update-product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.render('update-product', { ...product.toObject() });
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo el producto', error });
    }
});

export default router

