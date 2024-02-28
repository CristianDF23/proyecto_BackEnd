import { Router } from "express";
import ProductManagerMongo from "../dao/MongoDB/class/productManagerMongo.js";


const newProduct = new ProductManagerMongo()
const prodRoute = Router()

prodRoute.post('/', async (req, res) => {
    const addProducts = await newProduct.addProducts(req.body)
    if (!addProducts) {
        res.status(404).send({Msg:'Complete todos los campos'})
    }
    if (addProducts === "exist") {
        res.status(404).send({Msg: 'El producto ya se encuentra en la lista'})
    } else {
        res.status(201).send({
            msg: "Producto creado correctamente",
            data: req.body
        })
    }
})

prodRoute.get('/', async (req, res) => {
    const { limit } = req.query
    const products = await newProduct.getProducts(limit);
    if (!products) {
        res.status(404).render('error404.handlebars')
    } else {
        res.status(200).render('home.handlebars', { products })
    }
})

prodRoute.get('/:pid', async (req, res) => {
        const { pid } = req.params
        const products = await newProduct.getProductsById(pid)
        if (!products) {
            res.status(404).render('error404.handlebars')
        } else {
            res.status(200).render('product.handlebars', { products })
        }
})

prodRoute.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    const deleteProduct = await newProduct.deleteProduct(pid)
    if (!deleteProduct) {
        res.status(404).send({Msg:`No se pudo eliminar el producto, ID: ${pid} no encontrado`})
    } else {
        res.status(200).send({Msg:'Producto eliminado'})
    }

})

prodRoute.put('/:pid', async (req, res) => {
    const { pid } = req.params
    const updateProduct = await newProduct.updateProduct(pid, req.body)
    if (!updateProduct) {
        res.status(404).send({
            Msg: `No se pudo actualizar el producto, ID: ${pid} no encontrado`,
        })
    } else {
        res.status(200).send({
            Msg: 'Producto actualizado correctamente',
        })
    }
})



export default prodRoute