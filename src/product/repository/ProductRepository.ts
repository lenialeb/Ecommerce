import MongoRepository from "../../lib/repository/MongoRepository.js";
import { IProduct, ProductModel } from "../model/Product.js";
import { Document,Model, Types } from "mongoose";

export default class ProductRepository extends MongoRepository<IProduct>{
    constructor(){
        super('Product', ProductModel);
    }
    async findByCategory(category: string): Promise<IProduct[]> {
        return await ProductModel.find({ category }).populate('owner');
      }
     public async getAllProducts() {
        try {
            return await ProductModel.find();
        } catch (error) {
            throw new Error('Error fetching products: ' + error);
        }
    }
    public async readData(id: string) {
        const result = await this.model.findById(id);
        if (!result) {
            throw new Error(`Resource with ID ${id} not found for reading`);
        }
        return result;
    }
    
    public async updateData(id: string, resource: IProduct) {
        const existingDocument = await this.model.findById(id);
        if (!existingDocument) {
            throw new Error(`Resource with ID ${id} not found for updating`);
        }
    
        Object.assign(existingDocument, resource); // Update the existing document with new data
        await existingDocument.save(); // Save the updated document
    }
    public async deleteData(id: string) {
        const result = await this.model.findByIdAndDelete(id);
        if (!result) {
            throw new Error(`Resource with ID ${id} not found for deleting`);
        }
    }
    public async readDataByOwner(ownerId: string)  {
        console.log(`Searching for products with owner ID: ${ownerId}`);
        
        // const results = await this.model.find({ ownerId: ownerId });
        const results = await this.model.find({ owner: new Types.ObjectId(ownerId) });
        
        console.log(`Results found: ${JSON.stringify(results)}`);
        
        if (!results.length) {
            throw new Error(`No products found for owner ID ${ownerId}`);
        }
        return results;
    }

    
 public async readDataByCategory(category: string): Promise<IProduct[]> {
        const results = await this.model.find({ category: category });
        if (!results.length) {
            throw new Error(`No products found for category ${category}`);
        }
        return results;
    }

}