import { Router } from 'express';
import UserRoute from './UserRoute.js'; 
const AuthRouter = Router();

AuthRouter.use('/user', UserRoute);

export default AuthRouter;