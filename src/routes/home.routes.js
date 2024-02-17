import { Router } from "express";
import ProductManagerMongo from "../dao/MongoDB/class/productManagerMongo.js";

const homeRoute = Router();
const prodManager = new ProductManagerMongo()

homeRoute.get("/", async (req, res) => {
    const { limit } = req.query
    const products = await prodManager.getProducts(limit);
    console.log(products);
    res.render('home.handlebars', {products});
})

export default homeRoute