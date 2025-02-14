import MongoRepository from "../../../lib/repository/MongoRepository.js";
import { IUser, UserModel } from "../model/User.js";

export default class UserRepository extends MongoRepository<IUser>{
    constructor(){
        super('User', UserModel);
 
 
    }
    public async readData(id: string) {
        const result = await this.model.findById(id);
        if (!result) {
            throw new Error(`Resource with ID ${id} not found for reading`);
        }
        return result;
    }
    
    
}
