import { TokenGenerator } from "../../../lib/TokenGenerator.js";
import AuthProvider from "../di/AuthProvider.js";
import { Router } from "express";
import { UserModel } from "../model/User.js";
import bcrypt from "bcrypt";
const UserRoute = Router();

UserRoute.post(
    "/register",
    async (req: any, res: any) => {
        const { name, email, password } = req.body;
        try {
            const UserRepository = AuthProvider.provideUserRepository();
            const user = await UserRepository.readData(email);
            if (user) {
                return res.status(409).json({ error: "User already exist" });
            }
            const hashedPassword = await TokenGenerator.hashPassword(password);
            const token = TokenGenerator.generate();
            const date = new Date();
            const newUser = new UserModel({
                name,
                email, 
                password: hashedPassword, 
                token,
                tokenCreatedAt: date 
            });
            await UserRepository.createData(newUser);
            return res.status(200).json({
                success: true,
                user: {
                  name: newUser.name,
                  email: newUser.email,
                  token: newUser.token,
                  id: newUser._id
                },
              });
        } catch (error) {
            console.error("Error during registration: ", error);
            return res.status(500).json({error: "Internal server error"});
        }
        
    }
);

UserRoute.post(
    "/login",
    async (req: any, res: any) => {
        console.log(req.body);
        const { email, password } = req.body;
        console.log(email, password);
        try {
            const userRepository = AuthProvider.provideUserRepository();
            const user = await userRepository.readData(email);
            console.log(user);
            console.log(!!user && (await bcrypt.compare(password, user.password)));
            if (!!user && (await bcrypt.compare(password, user.password))) {
                return res.status(200).json({
                    success: true,
                    user: {
                        name: user.name,
                        email: user.email,
                        token: user.token,
                        role: user.role,
                        id: user._id
                    }
                });
            }
            return res.status(400).json({ error: 'Invalid Credential' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });

        }
        
    });

  
    UserRoute.get("/:id", async (req: any, res: any) => {
        const userId = req.params.id;
  
        try {
          const userRepository = AuthProvider.provideUserRepository();
          const user = await userRepository.readDataById(userId);
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
          return res.status(200).json(user);
        } catch (error) {
          console.error("Error retrieving user:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      });


export default UserRoute;