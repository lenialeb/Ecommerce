import PaymentRepository from "../repository/PaymentRepository.js";
import { IPayment } from "../model/Payment.js";
export default class PaymentProvider {

    private static PaymentRepository: PaymentRepository | null = null;
    private static PaymentModel: IPayment | null = null;

    public static providePaymentRepository() {
        if (this.PaymentRepository === null) {
            this.PaymentRepository = new PaymentRepository();
        }
        return this.PaymentRepository;
    }

}