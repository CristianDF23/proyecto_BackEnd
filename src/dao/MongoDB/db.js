import { connect } from "mongoose";

export const connection = async () => {
    try {
        await connect("mongodb+srv://cristianFernandez:231096Cdf@ecommerce.w64mz8y.mongodb.net/ecommerce");
        console.log("Base de datos conectada");

    } catch (err) {
        console.log(err);
    }
}

