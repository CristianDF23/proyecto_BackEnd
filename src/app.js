//Server
import express from "express";
import { connection } from "./dao/MongoDB/db.js";
import session from "express-session";
import MongoStore from "connect-mongo";

//Routes
import prodRoute from "./routes/products.routes.js";
import cartRoute from "./routes/carts.routes.js";

import { __dirname } from "../src/path.js"
import path from "path";
import handlebars from 'handlebars';
import exphbs from 'express-handlebars';
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import logRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";

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

//SESSION
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://cristianFernandez:231096Cdf@ecommerce.w64mz8y.mongodb.net/users"
    }),
    secret: 'cFer212301Co',
    resave: true,
    saveUninitialized: true
}))


//ROUTES
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', prodRoute)
app.use('/api/carts', cartRoute)
app.use('/api/users', logRouter)
app.use('/api/auth', authRouter)


app.listen(PORT, () => {
    console.log(`Server on Port ${PORT}`);
    connection()
})



