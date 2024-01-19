import express  from "express";
import prodRoute  from "./routes/products.routes.js";
import cartRoute from "./routes/carts.routes.js";

const app = express()

const PORT = 8080;

app.use(express.json())
app.use('/api/products', prodRoute)
app.use('/api/carts', cartRoute)


app.listen(PORT, ()=>{
    console.log(`Server on Port ${PORT}`);
})

