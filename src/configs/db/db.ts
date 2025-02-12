import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = "mongodb+srv://biruk:KvtzXC11BzBNxeqG@cluster0.0xmhz.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";
//  process.env.Db_URL as string;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
