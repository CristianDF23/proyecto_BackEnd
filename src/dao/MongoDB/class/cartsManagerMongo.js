import cartsModels from "../models/cartsModels.js";
import productsModels from "../models/productsModels.js"

class CartsManagerMongo {

    async createCart() {
        await cartsModels.create({})
    }

    async addProduct(cid, pid) {

        const cart = await cartsModels.findById(cid);
        const product = await productsModels.findById(pid);

        const existingItem = cart.products.find(item => item.id === pid);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.products.push({ id: pid, quantity: 1});
        }

        await cart.save();
        return cart;

    }


    async getCartProducts(cid) {
        const getCar = await cartsModels.findById(cid);
        return getCar;
    }
}

export default CartsManagerMongo;