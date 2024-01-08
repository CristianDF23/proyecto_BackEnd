const fs = require('fs');

class ProductManager {
    constructor() {
        this.products = []
        this.id = 1
        this.path = './articles.json'
    }

    async addProducts(product) {
        try {
            if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
                console.log("Complete todos los campos");
            } else {
                if (fs.existsSync(this.path)) {
                    const res = await fs.promises.readFile(this.path, 'utf-8');
                    const parseRes = JSON.parse(res);
                    const searchProduct = parseRes.some((i) => i.code === product.code);

                    if (searchProduct) {
                        console.log("El código de producto ya se encuentra en la lista");
                    } else {
                        product.id = this.id++;
                        parseRes.push(product);
                        await fs.promises.writeFile(this.path, JSON.stringify(parseRes, null, 2), 'utf-8');
                        console.log("El producto fue agregado a la lista");
                    }
                } else {
                    product.id = this.id++;
                    this.products.push(product);
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
                    console.log("El producto fue agregado a la lista");
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }



    getProducts() {
        fs.promises.readFile(this.path, 'utf-8')
            .then(res => {
                const parseRes = JSON.parse(res)
                if (parseRes.length != 0) {
                    console.log('Lista de Productos:\n', parseRes);
                }
            }).catch(err => {
                console.log('No existen elementos en la lista\n', err);
            })
    }

    getProductById(id) {
        fs.promises.readFile(this.path, 'utf-8')
            .then(res => {
                const parseRes = JSON.parse(res)
                const searchId = parseRes.find((i) => i.id === id)
                if (!searchId) {
                    console.log("El producto no existe");
                } else {
                    return console.log('El producto buscado es:\n', searchId);
                }
            }).catch(err => {
                console.log('Error:', err);
            })
    }

    deleteProduct(id) {
        fs.promises.readFile(this.path, 'utf-8')
            .then(res => {
                const parseRes = JSON.parse(res)
                const searchIndex = parseRes.findIndex(elem => elem.id === id)
                const removeIndex = parseRes.splice(searchIndex, 1)
                console.log(removeIndex);
                fs.promises.writeFile(this.path, JSON.stringify(parseRes, null, 2), 'utf-8')
            });
    }

    updateProduct(id, propiedad, valor) {
        fs.promises.readFile(this.path, 'utf-8')
            .then(res => {
                const parseRes = JSON.parse(res)
                const searchIndex = parseRes.findIndex(elem => elem.id === id)
                parseRes[searchIndex][propiedad] = valor;
                fs.promises.writeFile(this.path, JSON.stringify(parseRes, null, 2), 'utf-8')
            });
    }
}

const newProduct = new ProductManager()

// newProduct.addProducts({
//     title: "producto 1",
//     description: "computadora Acer",
//     price: 124000,
//     thumbnail: "computadoraAcer.jpg",
//     code: "C00001",
//     stock: 10
// });

// newProduct.addProducts({
//     title: "producto 2",
//     description: "computadora Asus",
//     price: 140000,
//     thumbnail: "computadoraAsus.jpg",
//     code: "C00002",
//     stock: 10
// })

// newProduct.addProducts({
//     title: "producto 3",
//     description: "computadora BGH",
//     price: 40000,
//     thumbnail: "computadoraBGH.jpg",
//     code: "C00003",
//     stock: 10
// })

// newProduct.getProducts();

// newProduct.getProductById(2)

// newProduct.deleteProduct(2)

//newProduct.updateProduct(1, 'description', 'computadora Acer, 16GB RAM, 120GB SSD')
