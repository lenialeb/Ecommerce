import mongoose, {  Document, model, Schema } from "mongoose";
import { IUser } from "../../auth/model/User.js";
interface IProduct extends Document {
    name: string;
    price: number;
    description: string;
    category: string;
    img: string;
    owner:IUser['_id'];
}

const ProductSchema = new Schema({
    name: { type: String, required: true},
    price: { type: Number, required: true},
    description: { type: String, required: true},
    category: { type: String, required: true},
    img: { type: String, required: false},
    owner:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
    // ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const  ProductModel = model<IProduct>('Product', ProductSchema);

export { IProduct, ProductModel };