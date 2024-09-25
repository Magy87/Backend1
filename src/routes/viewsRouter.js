import { Router } from "express"
import Product from "../models/Product.js";
//import fs from 'fs'
//import { isDataView } from "util/types"

const router = Router()

// router.get('/products', async (req, res) => {
//     const data = await fs.promises.readFile("products.json", 'utf-8')
//     const products = JSON.parse(data)
//     console.log(products)
//     res.status(200).render("index", { products })
// })

// router.get('/realTimeProducts', async (req, res) => {

//     res.status(200).render("realTimeProducts", {})
// })
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({})
        res.render('index', { products })
    } catch (error) {
        res.json (error)
    }
});

export default router

