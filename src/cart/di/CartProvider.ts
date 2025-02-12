

import { ICart,CartModel } from "../model/Cart.js";
import CartRepository from "../repository/CartRepository.js";
export default class CartProvider {

    private static CartRepository: CartRepository | null = null;
    private static ProductModel: ICart | null = null;
   

    public static provideCartRepository() {
        if (this.CartRepository=== null) {
            this.CartRepository = new CartRepository();
        }
        return this.CartRepository;
    }

}