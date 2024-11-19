import MongoRepository from "../../lib/repository/MongoRepository.js";
import { IUser, UserModel } from "../model/User.js";

export default class UserRepository extends MongoRepository<IUser>{
    constructor(){
        super('User', UserModel);
    }
}