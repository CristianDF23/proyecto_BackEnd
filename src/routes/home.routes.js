import { Router } from "express";
import ProductManagerMongo from "../dao/MongoDB/class/productManagerMongo.js";

const homeRoute = Router();
const prodManager = new ProductManagerMongo()

homeRoute.get("/", async (req, res) => {
    const { limit, page } = req.query;
    const { prop, str } = req.params
    const products = await prodManager.getProducts(prop, str, limit, page, undefined)
    res.render('home.handlebars', { products: products.docs, params: req.params, pageNumbers, liparams: req.query, page: products.page, prev, next });
    console.log(products);
})



export default homeRoute