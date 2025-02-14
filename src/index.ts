import * as dotenv from 'dotenv';
import express, { Router } from 'express';
import { connectDB } from './configs/db/db.js';
import routerPro from './product/route/Route.js';
import AuthRouter from './apps/auth/route/Route.js';
import PaymentRouter from './apps/payment/route/Route.js';
import AdminRouter from './apps/admin/route/Route.js';
import cors from 'cors';
import routerCart from './cart/route/Route.js';

dotenv.config();

const PORT  = process.env.PORT;
const app = express();

connectDB();


app.use('/', cors({
  origin: true, // NOTE: Allowing all origins for now
  optionsSuccessStatus: 200,
  preflightContinue: false,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true
}));

app.use(express.json());

app.use(AuthRouter,PaymentRouter, AdminRouter, routerPro, routerCart);
if (!PORT) {
  console.error("PORT is not defined in .env file");
  process.exit(1); // Exit the process with an error code
}

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});


