import mongoose from "mongoose";
import cartsModels from "../models/cartsModels.js";
import productsModels from "../models/productsModels.js"

class CartsManagerMongo {

    async createCart() {
        await cartsModels.create({})
        return true
    }

    async addProduct(cid, pid) {
        try {
            const cart = await cartsModels.findById(cid);
            const product = await productsModels.findById(pid);
            if (!cart) {
                console.log('Carrito no encontrado');
            }
            if (!product) {
                console.log('Producto no encontrado');
            }
            const existingItem = cart.products.findIndex(item => item.product == pid);
            if (existingItem !== -1) {
                cart.products[existingItem].quantity += 1;
            } else {
                cart.products.push({ product: pid, quantity: 1 });
            }
            await cart.updateOne(cart, cart);
            return true;
        } catch (error) {
            console.log('Error encontrado: \n', error);
        }
    }

    async getCartProducts(cid) {
        const getCar = await cartsModels.find({ _id: cid });
        const cart = getCar.find(item => item.id == cid)
        return cart
    }

    async deleteProducts(cid, pid) {
        try {
            const cart = await cartsModels.findById(cid) 
            const product = cart.products.find(i => i._id == pid)
            if (!cart) {
                console.log('Carrito no encontrado');
            }
            if (!product) {
                console.log('Producto no encontrado');
            }
            const productIndex = cart.products.findIndex(i => i._id == pid)
            if (productIndex !== -1) {
                cart.products.splice(productIndex, 1)
                await cart.save()
                return cart
            }
            await cart.updateOne(cart, cart)
        } catch (error) {
            console.error("Error al eliminar el producto del carrito:", '\n', error);
        }
    }

}

export default CartsManagerMongo;
