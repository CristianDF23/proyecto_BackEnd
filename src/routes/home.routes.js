import { Router } from "express";
import ProductManagerMongo from "../dao/MongoDB/class/productManagerMongo.js";

const homeRoute = Router();
const prodManager = new ProductManagerMongo()

homeRoute.get('/:filtro?/:parametro?', async (req, res) => {
    const { limit, page, sort } = req.query
    const { filtro, parametro } = req.params
    try {
        let prods;
        if (!filtro && !parametro) {
            prods = await prodManager.getProducts(limit, page, undefined, undefined, sort);
        } else {
            prods = await prodManager.getProducts(limit, page, filtro, parametro, sort);
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



export default homeRoute