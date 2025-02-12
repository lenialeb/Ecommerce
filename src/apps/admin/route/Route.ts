import { Router } from 'express';
import AdminRoute from './AdminRoute.js';
const AdminRouter = Router();

AdminRouter.use('/admin', AdminRoute);

export default AdminRouter;