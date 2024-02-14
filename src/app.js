import express from "express";
import prodRoute from "./routes/products.routes.js";
import cartRoute from "./routes/carts.routes.js";
import homeRoute from "./routes/home.routes.js";
import handlebars from "express-handlebars";
import path from "path";
import { __dirname } from "../src/path.js"
import Database from "./dao/MongoDB/db.js";

//SERVER EXPRESS
const app = express()

let PORT = 8080 || process.env.PORT;

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

app.listen(PORT, () => {
    console.log(`Server on Port ${PORT}`);
    Database.connect()
})

