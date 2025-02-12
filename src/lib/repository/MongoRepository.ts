import { Model, Document, Types } from "mongoose";
import IRepository from "./IRepository.js";

export default class MongoRepository<Resource extends Document> implements IRepository<Resource>{
    
    private collectionName: string;
    public model: Model<Resource>;

    constructor(collectionName: string, model: Model<Resource>) {
        this.collectionName = collectionName;
        this.model = model;
    }

    public async createData(resource: Resource) {
        const document = new this.model(resource);
        await document.save();
    }

    public async readData(email: string) {
        const result = await this.model.findOne({ email: email });
        if(!result)
            throw new Error(`Resource with ${email} not found for reading`);
        return result;
    }
   
    public async updateData(id: string, resource: Partial<Resource>) {
        const existingDocument = await this.model.findById(id);
        if (!existingDocument) {
            throw new Error(`Resource with ID ${id} not found for updating`);
        }
    
        Object.assign(existingDocument, resource); // Update the existing document with new data
        await existingDocument.save(); // Save the updated document
        return existingDocument; // Return the updated document
    }
    public async deleteData(email: string) {
        const result = await this.model.findOneAndDelete({ email: email });
        if (!result) {
            throw new Error(`Resource with ${email} not found for deleting`);
        }
    }

   
    
    
    
}
