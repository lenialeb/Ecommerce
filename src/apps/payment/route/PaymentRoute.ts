import * as dotenv from "dotenv";
import { response, Router } from "express";
import AuthProvider from "../../auth/di/AuthProvider.js";
import { error } from "console";
import axios from "axios";

dotenv.config();
const PaymentRoute = Router();
const CHAPA_URL = process.env.CHAPA_INITILIZE || "https://api.chapa.co/v1/transaction/initialize";
const CHAPA_URL_VERIFY = process.env.CHAPA_VERIFY;
const CHAPA_KEY = process.env.CHAPA_SECRET_KEY;
const BASE_URL = process.env.BASE_URL;
// PaymentRoute.post(
//     '/payment',
//     async(req: any, res: any) => {

//         const CALLBACK_URL = `${BASE_URL}pay/verify/`;
//         const RETURN_URL = `${BASE_URL}pay/success/`;
//         const { amount, token, email, name } = req.body;
//         const userRepository = AuthProvider.provideUserRepository();
//         const user = await userRepository.readData(email);
//         if (user?.token != token) {
//             return res.status(409).json({ error: "invalid token"});
//         }
//         const unique = "gebeya_" + Date.now();
//         console.log(unique);
//         const data = {
//             amount: amount,
//             currency: 'ETB',
//             email: email,
//             first_name: name,
//             last_name: name,
//             tx_ref: unique,
//             callback_url: CALLBACK_URL + unique,
//             return_url: RETURN_URL
//         }

//         await axios.post(CHAPA_URL, data, {
//             headers: {
//                 Authorization: `Bearer ${CHAPA_KEY}`
//             }
//         }).then((response) => {
//             return res.status(200).json({ checkout_url: response.data.data.checkout_url });
//         }) 
//         .catch((err) => console.error(err))

//     }
// );
interface CheckoutResponse {
    data: {
        checkout_url: string;
    };
}

// Your existing PaymentRoute setup
PaymentRoute.post('/payment', async (req: any, res:any) => {
    const CALLBACK_URL = `${BASE_URL}pay/verify/`;
    const RETURN_URL = `${BASE_URL}pay/success/`;
    const { amount, token, email, name } = req.body;
    const userRepository = AuthProvider.provideUserRepository();
    const user = await userRepository.readData(email);
    
    if (user?.token !== token) {
        return res.status(409).json({ error: "Invalid token" });
    }

    const unique = "gebeya_" + Date.now();
    console.log(unique);
    
    const data = {
        amount,
        currency: 'ETB',
        email,
        first_name: name,
        last_name: name,
        tx_ref: unique,
        callback_url: CALLBACK_URL + unique,
        return_url: RETURN_URL
    };

    try {
        const response = await axios.post<CheckoutResponse>(CHAPA_URL, data, {
            headers: {
                Authorization: `Bearer ${CHAPA_KEY}`
            }
        });

        return res.status(200).json({ checkout_url: response.data.data.checkout_url });
    } catch (error) {
        console.error("Error processing payment:", error);
        return res.status(500).json({ error: "Internal Server Error" });
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
        return res.status(200).json({result: "success"});
    }
)

export default PaymentRoute;