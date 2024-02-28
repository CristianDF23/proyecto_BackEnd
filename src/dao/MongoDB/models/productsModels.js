import {Schema, model} from 'mongoose';
import  paginate  from 'mongoose-paginate-v2';


const productSchema = new Schema({
    brand: {
        type: String,
    },
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
    money:{
        type: Number,
        default: function(){
            return this.price.toLocaleString()
        }
    },
    thumbnails: {
        type: Object
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

productSchema.plugin(paginate)

export default model("products", productSchema)