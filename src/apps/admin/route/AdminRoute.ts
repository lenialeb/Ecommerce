import { Router } from "express";
import AuthProvider from "../../auth/di/AuthProvider.js";
import { UserModel } from "../../auth/model/User.js";
const AdminRoute = Router();

AdminRoute.get(
    "/info",
    async (req: any, res: any) => {
        const { email, token } = req.body;
        console.log(email, token);
        try {
            const UserRepository = AuthProvider.provideUserRepository();
            const user = await UserRepository.readData(email);
            const count = await UserModel.estimatedDocumentCount();
            if ((user?.token != token) || (user?.role != "admin")) {
                return res.status(409).json({ error: "invalid credential"});
            }
            return res.status(200).json({ 
                user_num: count,
                product_num: 17,
                sales_num: 20 
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
)

export default AdminRoute;