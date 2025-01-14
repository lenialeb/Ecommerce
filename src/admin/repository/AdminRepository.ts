import MongoRepository from "../../lib/repository/MongoRepository.js";
import { IAdmin, AdminModel } from "../model/admin.js";

export default class AdminRepository extends MongoRepository<IAdmin>{
    constructor(){
        super('Admin', AdminModel);
    }
} 