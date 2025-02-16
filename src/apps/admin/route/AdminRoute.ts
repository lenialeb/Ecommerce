import { Router } from "express";
import AuthProvider from "../../auth/di/AuthProvider.js";
import { UserModel } from "../../auth/model/User.js";
import { ProductModel } from "../../../product/model/Product.js";
import { PaymentModel } from "../../payment/model/Payment.js";
const AdminRoute = Router();

AdminRoute.post(
    "/info",
    async (req: any, res: any) => {
        const { email, token } = req.body;
        console.log(email, token);
        try {
            const UserRepository = AuthProvider.provideUserRepository();
            const user = await UserRepository.readData(email);
            const user_count = await UserModel.estimatedDocumentCount();
            const product_count = await ProductModel.estimatedDocumentCount();
            const sales_count = await PaymentModel.estimatedDocumentCount();
            if ((user?.token != token) || (user?.role != "admin")) {
                return res.status(409).json({ error: "invalid credential"});
            }
            return res.status(200).json({ 
                user_num: user_count,
                product_num: product_count,
                sales_num: sales_count 
            });
        } catch (error) {
            console.error("Error: ", error);
            return res.status(500).json({error: "Internal server error"});
        }
        
    }
);

AdminRoute.post(
    '/users',
    async (req: any, res: any) => {
        const { email, token } = req.body;
        console.log(email, token);
        try {
            const UserRepository = AuthProvider.provideUserRepository();
            const user = await UserRepository.readData(email);
            console.log(user?.token);
            console.log(user?.role);
            if ((user?.token != token) || (user?.role != "admin")) {
                return res.status(409).json({ error: "invalid credential"});
            }
            const all_users = await UserModel.find().select('-password -__v -_id -token -tokenCreatedAt');
            return res.status(200).json({users: all_users});
        } catch(error) {
            console.error("Error: ", error);
            return res.status(500).json({error: "Internal server error"});
        }
    }
);

AdminRoute.post(
    '/products',
    async (req: any, res: any) => {
        const { email, token } = req.body;
        console.log(email, token);
        try {
            const UserRepository = AuthProvider.provideUserRepository();
            const user = await UserRepository.readData(email);
            console.log(user?.token);
            console.log(user?.role);
            if ((user?.token != token) || (user?.role != "admin")) {
                return res.status(409).json({ error: "invalid credential"});
            }
            const all_products = await ProductModel.find().select('-owner -__v -_id -img');
            return res.status(200).json({products: all_products});
        } catch(error) {
            console.error("Error: ", error);
            return res.status(500).json({error: "Internal server error"});
        }
    }
);

AdminRoute.post(
    '/sales',
    async (req: any, res: any) => {
        const { email, token } = req.body;
        console.log(email, token);
        try {
            const UserRepository = AuthProvider.provideUserRepository();
            const user = await UserRepository.readData(email);
            if ((user?.token != token) || (user?.role != "admin")) {
                return res.status(409).json({ error: "invalid credential"});
            }
            const all_sales = await PaymentModel.find().select('-owner -__v -_id');
            return res.status(200).json({sales: all_sales});
        } catch(error) {
            console.error("Error: ", error);
            return res.status(500).json({error: "Internal server error"});
        }
    }
);

export default AdminRoute;