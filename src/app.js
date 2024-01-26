import express from "express";
import prodRoute from "./routes/products.routes.js";
import cartRoute from "./routes/carts.routes.js";
import homeRoute from "./routes/home.routes.js";
import handlebars from "express-handlebars";
import http from "http"
import { __dirname } from "../src/path.js"
import { Server } from "socket.io";
import path from "path";
import { ProductManager } from "./models/productManager.js";
import routerRealTime from "./routes/realTimeProducts.routes.js";

const prodManager = new ProductManager('./src/data/products.json')

//SERVER EXPRESS
const app = express()

let PORT = 8080 || process.env.PORT;

//SERVER HTTP

const server = http.createServer(app)

//SOCKET
const io = new Server(server)

io.on("connection", (socket) => {
    console.log("Cliente Conectado");

    socket.on("getProducts", async()=>{
        const products = await prodManager.getProducts()
        io.emit('allProds', products)
    })
});

//PUBLIC
app.use(express.static(__dirname + '/public'))

//VIEWS
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname + '/views'))

//ROUTES
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', prodRoute)
app.use('/api/carts', cartRoute)
app.use('/api/home', homeRoute)
app.use('/api/', routerRealTime)

app.listen(PORT, () => {
    console.log(`Server on Port ${PORT}`);
})

