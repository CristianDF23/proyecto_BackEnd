import { Router } from "express";
import CartsManagerMongo from "../dao/MongoDB/class/cartsManagerMongo.js";

const newCart = new CartsManagerMongo();

const cartRoute = Router();

cartRoute.post('/', async (req, res) => {
    try {
        const addCart = await newCart.createCart();
        if (addCart) {
            res.status(201).send({ Msg: "El carrito fue creado con exito" });
        };
    } catch (err) {
        res.status(400).send({
            Msg: "Ocurrio un error al intentar crear el carrito",
        });
    };
});

cartRoute.post('/:cid/products/:pid', async (req, res) => {
    const { cid } = req.params;
    const { pid } = req.params;
    try {
        const addProd = await newCart.addProduct(cid, pid);
        if (addProd) {
            res.status(200).redirect(`/api/products/${pid}`);
        };
    } catch (error) {
        res.status(400).send({ Msg: `Ocurrio un error al intentar agregar el producto al carrito ${error}` });
    };
});

cartRoute.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await newCart.getCartProducts(cid);
        const products = cart.products
        if (products.length <= 0) {
            res.status(200).render('cartEmpty.handlebars');
            console.log(`Msg: Carrito Vacio`);
        } else {
            res.status(200).render('cart.handlebars', { products });
            console.log(`Msg: Carrito ID: ${cid}, con un total de ${products.length} productos`);
        };
    } catch (error) {
        console.log(error);
    };
});

cartRoute.delete('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await newCart.deleteProducts(cid, pid);
        const products = cart.products
        if (products){
            res.status(200).send({Msg: 'Producto Eliminado'})
        }
    } catch (error) {
        console.log(error);
    }
});

export default cartRoute