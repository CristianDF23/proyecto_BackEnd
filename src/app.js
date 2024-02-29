//Server
import express from "express";
import { connection } from "./dao/MongoDB/db.js";

//Routes
import prodRoute from "./routes/products.routes.js";
import cartRoute from "./routes/carts.routes.js";
import homeRoute from "./routes/home.routes.js";

import { __dirname } from "../src/path.js"
import path from "path";
import handlebars from 'handlebars';
import exphbs from 'express-handlebars';
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";

//SERVER EXPRESS
const app = express()

let PORT = 8080 || process.env.PORT;

//PUBLIC
app.use(express.static(__dirname + "/public"))

//VIEWS
app.engine("handlebars", exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(handlebars)
}));
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
    connection()
})



