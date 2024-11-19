import { Date, Document, model, Schema } from "mongoose";
import { isDate } from "util/types";

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    token: string;
    tokenCreatedAt: Date
}

const UserSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    token: { type: String, required: true},
    tokenCreatedAt: { type: Date, required: true}
});

const UserModel = model<IUser>('User', UserSchema);

export { IUser, UserModel};