import { Date, Document, model, Schema } from "mongoose";

interface IUser extends Document {
    role: string;
    name: string;
    email: string;
    password: string;
    token: string;
    tokenCreatedAt: Date
}

export const UserSchema = new Schema({
    role: { type: String, enum:['user', 'admin'], default: 'user', required: true},
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    token: { type: String, required: true},
    tokenCreatedAt: { type: Date, required: true}
});

const UserModel = model<IUser>('User', UserSchema);

export { IUser, UserModel };