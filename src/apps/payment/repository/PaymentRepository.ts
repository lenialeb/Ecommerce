import MongoRepository from "../../../lib/repository/MongoRepository.js";
import { IPayment, PaymentModel } from "../model/Payment.js";

export default class PaymentRepository extends MongoRepository<IPayment>{
    constructor(){
        super('Payment', PaymentModel);
    }    
}
