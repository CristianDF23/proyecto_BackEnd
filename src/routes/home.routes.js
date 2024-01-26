import { Router } from "express";
import { ProductManager } from "../models/productManager.js";

const homeRoute = Router();
const prodManager = new ProductManager('./src/data/products.json')

homeRoute.get("/", async (req, res) => {
    const products = await prodManager.getProducts();
    res.render('home', {products: products,
    });
})

export default homeRoute