import * as dotenv from "dotenv";
import { response, Router } from "express";
import AuthProvider from "../../auth/di/AuthProvider.js";
import CartProvider from "../../../cart/di/CartProvider.js";
import { error } from "console";
import axios from "axios";
import { UserModel } from "../../auth/model/User.js";
import PaymentProvider from "../di/PaymentProvider.js";
import { PaymentModel } from "../model/Payment.js";

dotenv.config();
const PaymentRoute = Router();
const CHAPA_URL = process.env.CHAPA_INITILIZE || "https://api.chapa.co/v1/transaction/initialize";
const CHAPA_URL_VERIFY = process.env.CHAPA_VERIFY;
const CHAPA_KEY = process.env.CHAPA_SECRET_KEY;
const BASE_URL = process.env.BASE_URL;
const FRONT_URL = process.env.FRONT_URL as string;

interface CheckoutResponse {
    data: {
        checkout_url: string;
    };
}

PaymentRoute.post(
    '/payment',
    async(req: any, res: any) => {

        const cartRepository = CartProvider.provideCartRepository();
        const paymentRepository = PaymentProvider.providePaymentRepository();
        const CALLBACK_URL = `${BASE_URL}pay/verify/`;
        const RETURN_URL = `${BASE_URL}pay/success/`;
        const { id, amount } = req.body;
        const cart = await cartRepository.getCart(id);
        const user = await UserModel.findById(id);
        const unique = "gebeya_" + Date.now();
        console.log(unique, id, amount);
        const payment = new PaymentModel({
            status: false,
            amount: amount,
            name: user.name,
            email: user.email,
            transaction_id: unique,
            cart: cart?._id,
            owner: id
        });

        const data = {
            amount: amount,
            currency: 'ETB',
            email: user.email,
            first_name: user.name,
            last_name: user.name,
            tx_ref: unique,
            callback_url: CALLBACK_URL + unique,
            return_url: RETURN_URL
        }
        await paymentRepository.createData(payment);
        console.log(data);

    try {
        const response = await axios.post<CheckoutResponse>(CHAPA_URL, data, {
            headers: {
                Authorization: `Bearer ${CHAPA_KEY}`
            }
        });

        return res.status(200).json({ checkout_url: response.data.data.checkout_url });
    } catch (error) {
        console.error("Error processing payment:", error.response?.data);
        return res.status(500).json({ error: error });
    }
});

PaymentRoute.get(
    '/verify/:id',
    async(req: any, res: any) => {
        await axios.get(CHAPA_URL_VERIFY + req.params.id, {
            headers: {
                Authorization: `Bearer ${CHAPA_KEY}`
            }
        })
        .then((response) => {
            return res.status(200).json({ verification: "complete" });
        })
        .catch((err) => console.log("Not verified"));
    }
);

PaymentRoute.get(
    '/success',
    async(req: any, res: any) => {
        return res.redirect(FRONT_URL);
    }
)

export default PaymentRoute;