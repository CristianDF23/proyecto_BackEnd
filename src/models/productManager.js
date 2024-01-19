import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';

export class ProductManager {
    constructor(path) {
        this.products = []
        this.path = path;
    }

    //Agregar productos a la lista

    async addProducts(product) {
        if (!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category) {
            return false
        } else {
            if (fs.existsSync(this.path)) {
                const res = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
                const searchCode = res.find((element) => element.code == product.code);
                if (searchCode) {
                    return 'existe'
                } else {
                    product.status = true
                    product.id = uuidv4()
                    res.push(product);
                    await fs.promises.writeFile(this.path, JSON.stringify(res, null, 2), 'utf-8');
                    return true
                }
            } else {
                product.status = true
                product.id = uuidv4()
                this.products.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
                return true
            }
        }
    }

    //Mostrar todos los productos de la lista

    async getProducts() {
        const res = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
        return res;
    }

    //Mostrar un producto de la lista segun su ID

    async getProductById(id) {
        let res = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
        const searchId = res.find(elem => elem.id == id);
        return searchId;
    }

    //Modificar propiedades de un producto mediante su ID

    async updateProduct(id, producto) {
        const prods = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        const prod = prods.find(producto => producto.id === id)
        if (prod) {
            prod.title = producto.title !== undefined ? producto.title : prod.title;
            prod.description = producto.description !== undefined ? producto.description : prod.description;
            prod.price = producto.price !== undefined ? producto.price : prod.price;
            prod.stock = producto.stock !== undefined ? producto.stock : prod.stock;
            prod.thumbnail = producto.thumbnail !== undefined ? producto.thumbnail : prod.thumbnail;
            prod.code = producto.code !== undefined ? producto.code : prod.code;
            prod.category = producto.category !== undefined ? producto.category : prod.category;
            prods.concat(prod)
            await fs.promises.writeFile(this.path, JSON.stringify(prods, null, 2))
            return true
        } else {
            return false
        }
    }

    //Eliminar un producto de la lista segun su ID

    async deleteProduct(id) {
        let res = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
        const prod = res.find(elem => elem.id == id);
        if(prod){
            const newArr = res.filter(elem => elem.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(newArr, null, 2), 'utf-8');
            return true
        }else{
            return false
        }
    }

}
