import cartsModels from "../models/cartsModels.js";

class CartsManagerMongo {

    async createCart() {
        await cartsModels.create({})
    }

    async addProduct(cid, pid) {
        const carts = await cartsModels.findById(cid)
        console.log(carts);
    }

    async getCartProducts(cid) {
        const getCar = await cartsModels.findById(cid );
        return getCar;
    }
}

export default CartsManagerMongo;