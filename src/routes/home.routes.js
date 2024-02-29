import { Router } from "express";
import ProductManagerMongo from "../dao/MongoDB/class/productManagerMongo.js";

const homeRoute = Router();
const prodManager = new ProductManagerMongo()

homeRoute.get('/', async (req, res) => {
    const { limit, page, sort, filtro, parametro } = req.query
    console.log(req.query.limit);
    try {
        const prods = await prodManager.getProducts(limit, page, filtro, parametro, sort);
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
        const params = req.query
        console.log(params.limit);
        const pages = Array.from({length: product.totalPages}, (_, i) => i + 1);
        res.status(200).render('home.handlebars', {product, pages, params})
    } catch (error) {
        console.log('Error encontrado: \n', error);
    }
})



export default homeRoute