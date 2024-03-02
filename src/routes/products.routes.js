import { Router } from "express";
import ProductManagerMongo from "../dao/MongoDB/class/productManagerMongo.js";


const newProduct = new ProductManagerMongo()
const prodRoute = Router()

//CREAR PRODUCTO NUEVO
prodRoute.post('/', async (req, res) => {
    try {
        const addProducts = await newProduct.addProducts(req.body)
        if (!addProducts) {
            res.status(404).send({ Msg: 'Complete todos los campos' })
        }
        if (addProducts === "exist") {
            res.status(404).send({ Msg: 'El producto ya se encuentra en la lista' })
        } else {
            res.status(201).send({
                msg: "Producto creado correctamente",
                data: req.body
            })
        }
    } catch (error) {
        console.log('Error encontrado: \n', error);
    }
})
//MOSTRAR TODOS LOS PRODUCTOS
prodRoute.get('/', async (req, res) => {
    const { limit, page, sort } = req.query
    const { filtro, parametro } = req.params
    try {
        let prods;
        if (!filtro && !parametro) {
            prods = await newProduct.getProducts(limit, page, undefined, undefined, sort);
        } else {
            prods = await newProduct.getProducts(limit, page, filtro, parametro, sort);
        }
        const status = prods ? 'success' : 'error';
        const prevPage = !prods.hasPrevPage ? null : Number(prods.page) - 1;
        const nextPage = !prods.hasNextPage ? null : Number(prods.page) + 1;
        const prevLink = prevPage ? `?&limit=${prods.limit}&page=${prevPage}` : null;
        const nextLink = nextPage ? `?&limit=${prods.limit}&page=${nextPage}` : null;

        const product = {
            status,
            payload: prods.docs,
            totalPages: prods.totalPages,
            prevPage,
            nextPage,
            page: prods.page,
            hasPrevPage: prods.hasPrevPage,
            hasNextPage: prods.hasNextPage,
            prevLink,
            nextLink
        }
        const param = req.params
        const query = req.query
        const pages = Array.from({ length: product.totalPages }, (_, i) => i + 1);
        res.status(200).render('home.handlebars', { product, pages, query, param })
    } catch (error) {
        console.log('Error encontrado: \n', error);
    }
})
//MOSTRAR UN PRODUCTO
prodRoute.get('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        const products = await newProduct.getProductsById(pid)
        if (!products) {
            res.status(404).render('error404.handlebars')
        } else {
            res.status(200).render('product.handlebars', { products })
        }
    } catch (error) {
        console.log('Error encontrado: \n', error);
    }
})
//ELIMINAR PRODUCTO
prodRoute.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        const deleteProduct = await newProduct.deleteProduct(pid)
        if (!deleteProduct) {
            res.status(404).send({ Msg: `No se pudo eliminar el producto, ID: ${pid} no encontrado` })
        } else {
            res.status(200).send({ Msg: 'Producto eliminado' })
        }
    } catch (error) {
        console.log('Error encontrado: \n', error);
    }
})
//ACTUALIZAR PRODUCTO
prodRoute.put('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
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
    } catch (error) {
        console.log('Error encontrado: \n', error);
    }

})



export default prodRoute