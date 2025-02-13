import MongoRepository from "../../lib/repository/MongoRepository.js";
import { ICart, ICartItem, CartModel } from "../model/Cart.js";
import mongoose, { Document, Model, Types } from "mongoose";
import { ProductModel } from "../../product/model/Product.js";
export default class CartRepository extends MongoRepository<ICart> {
  constructor() {
    super("Cart", CartModel);
  }
  // async findByCategory(category: string): Promise<IProduct[]> {
  //     return await ProductModel.find({ category }).populate('owner');
  //   }
  public async getCart(owner: string): Promise<ICart | null> {
    try {
        console.log("Fetching cart for owner:", owner);
        const cart = await CartModel.findOne({ owner }).populate("items.productId");
        console.log("Cart fetched:", cart);
        return cart;
    } catch (error) {
        console.error("Error fetching cart from database:", error);
        throw error; // Rethrow error to be caught in the route
    }
}
//   public async addToCart(owner: string, productId: string): Promise<ICart> {
//     let cart = await CartModel.findOne({ owner });
//     if (!cart) {
//       cart = new CartModel({ owner, items: [] });
//     }
//     const existingItem = cart.items.find(
//       (item) => productId.toString() === productId
//     );
//     if (existingItem) {
//       existingItem.quantity += 1;
//     } else {
//       const product = await ProductModel.findById(productId);
//       if (!product) throw new Error("product not found");
//       cart.items.push({
//         productId: new mongoose.Types.ObjectId(productId),
//         quantity: 1,
//       });
//     }
//     await cart.save();
//     return cart;
//   }


public async addToCart(owner: string, productId: string): Promise<ICart> {
    let cart = await CartModel.findOne({ owner });

    if (!cart) {
        cart = new CartModel({ owner, items: [] });
    }

    const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId // Correct comparison
    );

    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item exists
    } else {
        const product = await ProductModel.findById(productId);
        if (!product) throw new Error("Product not found");

        cart.items.push({
            productId: product, // Store the product ID
            quantity: 1, // Initialize quantity to 1
        });
    }

    await cart.save();
    console.log("Added product:", productId);
    return cart;
}
  public async updateCartItem(
    owner: string,
    productId: string,
    quantity: number
  ): Promise<void> {
    const cart = await CartModel.findOne({ owner });
    if (!cart) return;

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (item) {
      item.quantity = quantity;
      await cart.save();
    }
  }
  public async removeCart(owner: string, productId: string): Promise<void> {
    const cart = await CartModel.findOne({ owner });
    if (!cart) {
      console.log(`Cart not found for userId: ${owner}`);
      return;
    }

    console.log(`Current items in cart: ${JSON.stringify(cart.items)}`);

    const initialItemCount = cart.items.length;
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    console.log(`Filtered items: ${JSON.stringify(cart.items)}`);
    console.log(`Items removed: ${initialItemCount - cart.items.length}`);

    await cart.save();
  }
}
