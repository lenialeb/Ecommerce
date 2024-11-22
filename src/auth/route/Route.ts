import { Router } from 'express';
import UserRoute from './UserRoute.js'; 
const router = Router();

router.use('/user', UserRoute);

export default router;