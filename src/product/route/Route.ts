import { Router } from 'express';
import ProductRoute from './ProductRoute.js'; 
const routerPro = Router();

routerPro.use('/product', ProductRoute);

export default routerPro;