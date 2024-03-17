import { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
        },
        first_name: {
            type: String,
        },
        last_name: {
            type: String,
        },
        phone: {
            type: Number,
        },
        age: {
            type: Number,
        }
    },
    {
        strict: false,
    }
);

export default model("users", UserSchema);