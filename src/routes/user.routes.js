import { Router } from "express";
import CartsManagerMongo from "../dao/MongoDB/class/cartsManagerMongo.js";

const newCart = new CartsManagerMongo()
const userRoute = new Router();

userRoute.get('/loginUser', async (req, res) => {
    const userInform = req.session.passport;
    let cartId = null;
    let quantity = null;

    if (userInform) {
        cartId = userInform.user.cart;
        quantity = await newCart.quantityCart(cartId);
    }
    res.render('login.handlebars', { quantity });
});

userRoute.get('/registerUser', async (req, res) => {
    const userInform = req.session.passport;
    let cartId = null;
    let quantity = null;

    if (userInform) {
        cartId = userInform.user.cart;
        quantity = await newCart.quantityCart(cartId);
    }

    res.render('register.handlebars', { quantity });
});


userRoute.get('/profileUser', async (req, res) => {
    const userInform = req.session.passport
    const cartId = userInform.user.cart
    const resp = await newCart.getCartProducts(cartId)
    const quantity = await newCart.quantityCart(cartId)
    res.render('profile.handlebars', { userInform, products: resp.products, quantity, cartId })
})




export default userRoute 