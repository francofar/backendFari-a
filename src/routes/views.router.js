import { Router } from 'express';
import ProductManager from "../managers/product.manager.js";
import { __dirname } from "../path.js";

const router = Router();
const productManager = new ProductManager(`${__dirname}/db/products.json`);

router.get('/products', (req, res) => {
    res.render('products');
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('home', { products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;