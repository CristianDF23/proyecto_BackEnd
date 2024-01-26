import { Router } from "express";
import { ProductManager } from "../models/productManager.js";

const productManager = new ProductManager('./src/data/products.json');

const prodRoute = Router()

prodRoute.post('/', async (req, res) => {
    const create = await productManager.addProducts(req.body);
    if (!create) {
        res.status(401).send('Complete todos los campos')
    } else if (create != 'existe') {
        res.status(201).send('Producto agregado correctamente')
    } else {
        res.status(404).send('El producto ya se encuentra en la lista')
    }
})

prodRoute.get('/', async (req, res) => {
    const { limit } = req.query
    const prods = await productManager.getProducts();
    const products = prods.slice(0, limit)
    if(products.length > 0){
        res.status(200).send(products)
    }else{
        res.status(404).send('Lista de productos vacia')
    }
})

prodRoute.get('/:pid', async (req, res) => {
    const { pid } = req.params
    const prod = await productManager.getProductById(pid)
    res.status(200).send(prod)
})

prodRoute.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    const prod = await productManager.deleteProduct(pid)
    if(prod){
        res.status(200).send('Producto eliminado correctamente')
    }else{
        res.status(404).send('Producto no encontrado')
    }
})

prodRoute.put('/:pid', async (req, res) => {
    const { pid } = req.params
    const prod = await productManager.updateProduct(pid, req.body)
    if(prod){
        res.status(200).send(`Producto modificado correctamente`)
    }else{
        res.status(404).send('Producto no encontrado')
    }
})

export default prodRoute