import { Router } from "express";
import CartsManagerMongo from "../dao/MongoDB/class/cartsManagerMongo.js";

const newCart = new CartsManagerMongo();
const cartRoute = Router();

//CREAR CARRITO NUEVO
cartRoute.post('/', async (req, res) => {
    try {
        const createCart = await newCart.createCart();
        if (createCart) {
            res.status(201).send({ Msg: "El carrito fue creado con exito" });
        };
    } catch (err) {
        res.status(404).send({
            Msg: "Ocurrio un error al intentar crear el carrito",
        });
    };
});

//AGREGAR PRODUCTO AL CARRITO
cartRoute.post('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const addProd = await newCart.addProduct(cid, pid);
        if (addProd) {
            res.status(200).redirect(`/api/products/${pid}`);
        };
    } catch (error) {
        res.status(400).send({ Msg: `Ocurrio un error al intentar agregar el producto al carrito ${error}` });
    };
});

//MOSTRAR CARRITO
cartRoute.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const userInform = req.session.passport;
        const cart = await newCart.getCartProducts(cid);
        const products = cart.products;
        products._cartId = cid
        const quantity = await newCart.quantityCart(cid);
        const totalPrice = await newCart.totalPrice(cid);
        if (products.length === 0) {
            res.status(200).render('cartEmpty.handlebars', { userInform });
            console.log(`Msg: Carrito Vacio`);
        } else {
            if (!userInform) {
                res.status(200).render('cart.handlebars', { products, quantity, totalPrice });
            } else {
                res.status(200).render('cart.handlebars', { products, quantity, totalPrice, userInform });
            }
        }
    } catch (error) {
        console.log('Error encontrado: \n', error);
    };
});

//ELIMINAR PRODUCTO DEL CARRITO
cartRoute.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await newCart.deleteProducts(cid, pid);
        if (cart) {
            res.status(200).send({ Msg: 'Producto eliminado con exito' })
        } else {
            res.status(404).send({ Msg: 'Carrito o producto no encontrado' })
        }
    } catch (error) {
        console.log('Error encontrado: \n', error);
    }
});

//ELIMINAR CARRITO
cartRoute.delete('/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        const deleteCart = await newCart.deletCart(cid)
        if (deleteCart) {
            res.status(200).send({ Msg: 'Carrito vaciado con exito' })
        } else {
            res.status(404).send({ Msg: 'No se pudo vaciar el carrito' })
        }
    } catch (error) {
        console.log('Error encontrado: \n', error);
    }
})
//VACIAR CARRITO
cartRoute.delete('/deleteAllProducts/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        const deleteProducts = await newCart.deleteAllProducts(cid)
        if (deleteProducts) {
            res.status(200).render('cartEmpty.handlebars')
            console.log('Msg: Carrito Vacío');
        }
    } catch (error) {
        console.log('Error encontrado: \n', error);
    }
})
//ACTUALIZAR CARRITO
cartRoute.put('/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        const update = await newCart.updateAllProducts(cid, req.body);
        if (update) {
            res.status(200).send({ Msg: 'Carrito actualizado correctamente' })
        } else {
            res.status(404).send({ Msg: 'Error al actualizar el carrito' })
        }

    } catch (error) {
        console.log('Error encontrado: \n', error);
    }
})
//ACTUALIZAR LAS CANTIDADES DE LOS PRODUCTOS
cartRoute.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body
    try {
        const update = await newCart.updateQuantity(cid, pid, quantity);
        if (update) {
            res.status(200).send({ Msg: 'Producto actualizado correctamente' })
        } else {
            res.status(404).send({ Msg: 'Error al actualizar el producto' })
        }

    } catch (error) {
        console.log('Error encontrado: \n', error);
    }
})

export default cartRoute