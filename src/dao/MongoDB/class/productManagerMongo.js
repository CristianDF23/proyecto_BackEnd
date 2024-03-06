import productsModels from "../models/productsModels.js"


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

    async getProducts(limit, page, filtro, parametro, sort) {
        try {
            limit = limit || 10;
            page = page || 1;

            filtro = filtro || undefined;
            parametro = parametro || undefined;

            if (sort !== 'asc' && sort !== 'desc') {
                sort = 'asc';
            }
            const optionSort = { price: sort }
            const prods = await productsModels.paginate({ [filtro]: parametro }, { limit: limit, page: page, sort: optionSort });
            return prods
        } catch (error) {
            console.log('Error encontrado: \n', error);
            return false
        }
    }

    async getProductsById(pid) {
        try {
            const product = await productsModels.findById(pid);
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

