import cartsModels from "../models/cartsModels.js";
import productsModels from "../models/productsModels.js"

class CartsManagerMongo {

    async createCart() {
        try {
            await cartsModels.create({})
            return true
        } catch (error) {
            console.log('Error encontrado: \n', error);
            return false
        }
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
            return false
        }
    }

    async getCartProducts(cid) {
        try {
            const getCar = await cartsModels.findOne({ _id: cid });
            return getCar
        } catch (error) {
            console.log('Error encontrado: \n', error);
            return false
        }
    }

    async deleteProducts(cid, pid) {
        try {
            const cart = await cartsModels.findById(cid)
            const product = cart.products.find(i => i._id == pid)
            console.log(product);
            if (!cart) {
                console.log('Carrito no encontrado');
            }
            if (!product) {
                console.log('Producto no encontrado');
            }
            const productIndex = cart.products.findIndex(i => i._id == pid)
            if (productIndex === -1) {
                console.log('Producto no encontrado');
                return false
            }
            cart.products.splice(productIndex, 1)
            await cart.save()
            return cart
        } catch (error) {
            console.log('Error encontrado: \n', error);
            return false
        }
    }

    async deletCart(cid) {
        try {
            await cartsModels.deleteOne({ _id: cid })
            return true
        } catch (error) {
            console.log('Error encontrado: \n', error);
            return false
        }
    }

    async deleteAllProducts(cid) {
        try {
            const cart = await cartsModels.updateOne({ _id: cid }, { $set: { products: [] } });
            return cart
        } catch (error) {
            console.log('Error encontrado: \n', error);
            return false
        }
    }

    async updateAllProducts(cid, prods) {
        try {
            const cart = await cartsModels.findById(cid);
            cart.products = [];
            prods.forEach(async product => {
                cart.products.push({ product: product._id, quantity: 1 });
            });
            await cart.save()
            return true
        } catch (error) {
            console.log('Error encontrado: \n', error);
            return false
        }
    }

    async updateQuantity(cid, pid, quantity) {
        try {
            const cart = await cartsModels.findById(cid);
            if (!cart) {
                console.log('Carrito no encontrado');
                return false;
            }

            const productIndex = cart.products.findIndex(i => i._id == pid);
            if (productIndex === -1) {
                console.log('Producto no encontrado');
                return false;
            }

            cart.products[productIndex].quantity += quantity;
            await cart.save();
            return true;
        } catch (error) {
            console.log('Error encontrado: \n', error);
            return false;
        }
    }



}

export default CartsManagerMongo;
