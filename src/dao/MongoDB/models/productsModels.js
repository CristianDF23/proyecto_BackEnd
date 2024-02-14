import {Schema, model} from 'mongoose';

const productSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true
    },
    thumbnails: {
        type: Object,
    },
    code: {
        type: String,
        require: true,
        unique: true
    },
    stock: {
        type: Number,
        require: true        
    },
    status: {
        type: Boolean,
        require: true
    },
    category: {
        type: String,
        require: true
    },

})

export default model("products", productSchema)