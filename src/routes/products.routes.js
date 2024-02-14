import { Router } from "express";
import ProductManagerMongo from "../dao/MongoDB/class/productManagerMongo.js";

const newProduct = new ProductManagerMongo()
const prodRoute = Router()

prodRoute.post('/', async (req, res) => {
    await newProduct.addProducts(req.body)
    res.status(201).send({
        msg: "Producto creado correctamente",
        data: req.body
    })
})

prodRoute.get('/', async (req, res) => {
    const { limit } = req.query
    const prods = await newProduct.getProducts(parseInt(limit));
    res.status(200).send(prods)
})

prodRoute.get('/:pid', async (req, res) => {
    const { pid } = req.params
    const prod = await newProduct.getProductsById(pid)
    res.status(200).send(prod)
})

prodRoute.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    await newProduct.deleteProduct(pid)

})

prodRoute.put('/:pid', async (req, res) => {
    const { pid } = req.params
    await newProduct.updateProduct(pid, req.body)
    res.status(200).send(prod)
})

export default prodRoute