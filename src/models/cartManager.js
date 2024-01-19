import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';

export class CartManager {
    constructor(path) {
        this.cart = {};
        this.carts = [];
        this.path = path;
    }

    //Crear carrito nuevo dentro del array de carritos
    async createCart(){
        if (fs.existsSync(this.path)) {
            const res = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
            this.cart.id = uuidv4();
            this.cart.products = [];
            res.push(this.cart);
            await fs.promises.writeFile(this.path, JSON.stringify(res, null, 2), 'utf-8');
            return true
        }else{
            this.cart.id = uuidv4();
            this.cart.products = [];
            this.carts.push(this.cart);
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2), 'utf-8');
            return true
        }
    }

    //Mostrar carrito segun su id
    async getCartProducts(id){
        const res = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
        const findCart = res.filter(elem => elem.id == id)
        return findCart;
    }

    //Agregar id de un producto al carrito seleccionado
    async addProduct(cid, pid){
        const carts = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
        const cartId = carts.findIndex(elem => elem.id == cid);
        const existProdIndex = carts[cartId].products.findIndex(prod => prod.idProd == pid);
        if (existProdIndex !== -1) {
            carts[cartId].product[existProdIndex].quantity++;
        } else {
            const newProduct = { idProd: pid, quantity: 1 };
            carts[cartId].products.push(newProduct);
        }
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');
        return true;
    }
}
