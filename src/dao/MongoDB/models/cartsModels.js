import { Schema, model } from 'mongoose';

const carsSchema = new Schema({
    products: {
        type: [{
            product: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            }
        }]

    }
});

export default model("carts", carsSchema);