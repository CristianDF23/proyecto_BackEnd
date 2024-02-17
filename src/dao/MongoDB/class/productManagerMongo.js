import productsModels from "../models/productsModels.js"

class ProductManagerMongo {
    async addProducts(product) {
        if(!(product.title && product.description && product.price && product.code && product.stock && product.category)){
            return false
        }
        productsModels.create(product)
    }

    async getProducts(li) {
        const prods = await productsModels.find().limit(li)
        return prods
    }

    async getProductsById(id) {
        const searchById = await productsModels.findById(id);
        return searchById;
    }

    async deleteProduct(id) {
        const deleteById = await productsModels.findByIdAndDelete(id);
        return deleteById;
    }

    async updateProduct(id, product) {
        await productsModels.findByIdAndUpdate(id, product, {
            new: true,
        })
    }
}

export default ProductManagerMongo;


