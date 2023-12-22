class ProductManager {
    constructor() {
        this.products = []
        this.id = 1
    }

    addProducts(product) {
        const searchProducts = this.products.some((i) => i.code === product.code);

        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.log("Complete todos los campos");
        }else if(searchProducts){
            console.log("El codigo de producto ya se encuentra en la lista");
        }else{
        product.id = this.id++;
        this.products.push(product);
        console.log("El producto fue agregado a la lista");
        }
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        const searchId = this.products.find((i) => i.id === id)
        if (!searchId) {
            console.log("El producto no existe");
        }
        return searchId;
    }
}

const product = new ProductManager();

product.addProducts({
    title: "producto 1",
    description: "computadora Acer",
    price: 124000,
    thumbnail: "computadoraAcer.jpg",
    code: "C00001",
    stock: 10
})


product.addProducts({
    title: "producto 2",
    description: "computadora Asus",
    price: 140000,
    thumbnail: "computadoraAsus.jpg",
    code: "C00002",
    stock: 10
})

const mostrarProductos = product.getProducts()
console.log("Lista de productos", mostrarProductos);

const buscarId = product.getProductById(2)
console.log("El producto buscado es:", buscarId);