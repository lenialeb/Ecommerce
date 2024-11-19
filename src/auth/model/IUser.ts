import { Document, model, Schema } from "mongoose";

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

const UserSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}
});

const UserModel = model<IUser>('User', UserSchema);

export { IUser, UserModel};