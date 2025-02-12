import mongoose, {  Document, model, Schema } from "mongoose";
import { IUser } from "../../auth/model/User.js";
import { IProduct } from "../../product/model/Product.js";

 interface ICartItem {
    productId: IProduct; // Reference to the product
    quantity: number;
  
      // Quantity of the product in the cart
  }
  
  // Define the interface for the cart
 interface ICart extends Document {
    owner: string;    // The user ID of the cart owner
    items: ICartItem[]; // An array of cart items
  }
  const CartItemSchema= new Schema({
    productId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    quantity:{type:Number, default:1},
  })
const CartSchema = new Schema({

    owner:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    items:[CartItemSchema],
    // ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const  CartModel = model<ICart>('Cart', CartSchema);

export {CartModel,ICart,ICartItem} ;