import { Schema, model } from 'mongoose';

const carsSchema = new Schema({
    products: {
        type: Array,
        require: true,
        id: {
            type: String,
            require: true,
        },
        quantity: {
            type: Number,
            require: true,
        }
    }
});

export default model("cars", carsSchema);