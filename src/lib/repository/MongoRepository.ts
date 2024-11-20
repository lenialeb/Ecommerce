import {Model, Document, UpdateQuery} from "mongoose";
import IRepository from "./IRepository.js";

export default class MongoRepository<Resource extends Document> implements IRepository<Resource>{
    
    private collectionName: string;
    private model: Model<Resource>;

    constructor(collectionName: string, model: Model<Resource>) {
        this.collectionName = collectionName;
        this.model = model;
    }

    public async createData(resource: Resource) {
        const document = new this.model(resource);
        await document.save();
    }

    public async readData(email: string) {
        const result = await this.model.findOne({email: email.toString()});
        if (!result) {
            throw new Error(`Resource with ${email} not found for reading`);
        }
        return result;
    }


    public async updateData(id: string, resource: Resource) {
        const plainResource = resource.toObject ? resource.toObject() : resource;
        const result = await this.model.findByIdAndUpdate(id, plainResource as UpdateQuery<Resource>);
        if (!result) {
            throw new Error(`Resource with ${id} not found for updating`)
        }
    }
    public async deleteData(id: string) {
        const result = await this.model.findByIdAndDelete(id);
        if (!result) {
            throw new Error(`Resource with ${id} not found for deleting`);
        }
    }

    
    
}
