import mongoose, {  Document, model, Schema } from "mongoose";
import { IUser } from "../../auth/model/User.js";
import { ICart } from "../../../cart/model/Cart.js";

interface IPayment extends Document {
    status: boolean;
    amount: number;
    name: string,
    email: string,
    transaction_id: string;
    cart: ICart['_id'];
    owner:IUser['_id'];
}

const PaymentSchema = new Schema({
    status: { type: Boolean, required: true},
    amount: { type: Number, required: true},
    name: { type: String, required: true},
    email: { type: String, required: true},
    transaction_id: { type: String, required: true, unique: true},
    cart: {type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true},
    owner:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

const  PaymentModel = model<IPayment>('Payment', PaymentSchema);

export { IPayment, PaymentModel };