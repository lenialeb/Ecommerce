import { Router } from 'express';
import PaymentRoute from './PaymentRoute.js';
const PaymentRouter = Router();

PaymentRouter.use('/pay', PaymentRoute);

export default PaymentRouter;