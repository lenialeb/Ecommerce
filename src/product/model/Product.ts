import mongoose, {  Document, model, Schema } from "mongoose";
import { IUser } from "../../apps/auth/model/User.js";
interface IProduct extends Document {
    name: string;
    price: number;
    description: string;
    category: string;
    img: string;
    owner:IUser['_id'];
}

const ProductSchema = new Schema({
    name: { type: String, required: true, unique:true},
    price: { type: Number, required: true, unique:false},
    description: { type: String, required: true, unique:false},
    category: { type: String, required: true, unique:false},
    img: { type: String, required: false, unique:false},
    owner:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique:false}
    // ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const  ProductModel = model<IProduct>('Product', ProductSchema);

export { IProduct, ProductModel };