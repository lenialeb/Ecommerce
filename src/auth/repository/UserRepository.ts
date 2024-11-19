import MongoRepository from "../../lib/repository/MongoRepository.js";
import { IUser, UserModel } from "../model/IUser.js";

export default class UserRepository extends MongoRepository<IUser>{
    constructor(){
        super('User', UserModel);
    }
}