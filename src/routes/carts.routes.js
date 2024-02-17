import { Router } from "express";
import CartsManagerMongo from "../dao/MongoDB/class/cartsManagerMongo.js";

const newCart = new CartsManagerMongo()

const cartRoute = Router()

cartRoute.post('/', async (req, res) => {
    await newCart.createCart(req.body);
    res.status(201).send("Carrito Creado")
})

cartRoute.get('/:cid', async (req, res) => {
    const { cid } = req.params
    const allProducts = await newCart.getCartProducts(cid)
    console.log(allProducts);
    res.send(allProducts)
})

cartRoute.post('/:cid/products/:pid', async (req, res) => {
    const { cid } = req.params;
    const { pid } = req.params;
    await newCart.addProduct(cid, pid)
    res.status(200)
})

export default cartRoute