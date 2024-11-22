import * as dotenv from 'dotenv';
import express, { Router } from 'express';
import { connectDB } from './configs/db/db.js';
import router from './auth/route/Route.js';

dotenv.config();

const PORT  = process.env.PORT;
const app = express();

connectDB();

app.use(express.json());

app.use(router);
if (!PORT) {
  console.error("PORT is not defined in .env file");
  process.exit(1); // Exit the process with an error code
}

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});


