import { Router } from 'express';

import CartRoute from './CartRoute.js';
const routerCart = Router();

routerCart.use('/cart', CartRoute);

export default routerCart;