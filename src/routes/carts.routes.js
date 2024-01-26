import { Router } from "express";
import { CartManager } from "../models/cartManager.js";

const cartManager = new CartManager('./src/data/cart.json');

const cartRoute = Router()

cartRoute.post('/', async (req, res) => {
    const create = await cartManager.createCart();
    if (create) {
        res.status(201).send('Carrito creado correctamente')
    }
})

cartRoute.get('/:cid', async (req, res) => {
    const { cid } = req.params
    const allProducts = await cartManager.getCartProducts(cid)
    console.log(allProducts);
    res.send(allProducts)
})

cartRoute.post('/:cid/products/:pid', async (req, res) => {
    const { cid } = req.params;
    const { pid } = req.params;
    await cartManager.addProduct(cid, pid)
    res.status(200).send('Producto agregado correctamente al carrito')
})

export default cartRoute