import productsModels from "../models/productsModels.js"
import { paginate } from "./paginationManager.js";

class ProductManagerMongo {
    async addProducts(product) {
        try {
            const existProduct = await productsModels.findOne({ code: product.code })
            console.log(existProduct);
            if (!(product.title || product.description || product.price || product.code || product.stock || product.category)) {
                return false
            } else if (existProduct) {
                return 'exist'
            } else {
                productsModels.create(product)
                return true;
            }
        } catch (error) {
            console.log('Error encontrado: \n', error);
        }
    }

    async getProducts( prop, str, numLimit, numPage, numSort) {
        try {
            const prods = await paginate(prop, str,numLimit, numPage, numSort)
            if (!numLimit) numLimit = 10;
            if (!numPage) numPage = 1;
            !prods.hasPrevPage ? numPage = 1 : numPage --
            !prods.hasNextPage ? numPage = prods.page : numPage = prods.totalPages
            return prods

        } catch (error) {
            console.log('Error encontrado: \n', error);
        }
    }
        

    async getProductsById(pid) {
        try {
            const product = await productsModels.findOne({ _id: pid });
            if (!product) {
                return false
            } else {
                return product;
            }
        } catch (error) {
            console.log('Error encontrado: \n', error);
        }
    }


    async deleteProduct(id) {
        try {
            const deleteById = await productsModels.findByIdAndDelete(id);
            if (!deleteById) {
                return false
            } else {
                return true
            }
        } catch (error) {
            console.log('Error encontrado: \n', error);
        }
    }

    async updateProduct(id, product) {
        try {
            const updateProduct = await productsModels.findByIdAndUpdate(id, product, {
                new: true,
            })
            if (!updateProduct) {
                return false
            } else {
                return updateProduct
            }
        } catch (error) {
            console.log('Error encontrado: \n', error);
        }
    }

}

export default ProductManagerMongo;

