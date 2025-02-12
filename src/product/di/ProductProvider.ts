

import { IProduct,ProductModel } from "../model/Product.js";
import ProductRepository from "../repository/ProductRepository.js";
export default class ProductProvider {

    private static ProductRepository: ProductRepository | null = null;
    private static ProductModel: IProduct | null = null;
   

    public static provideProductRepository() {
        if (this.ProductRepository=== null) {
            this.ProductRepository = new ProductRepository();
        }
        return this.ProductRepository;
    }

}