import { Date, Document, model, Schema } from "mongoose";
import { IUser } from "../../auth/model/User.js";

interface IAdmin extends IUser {
    role: string;
}

const AdminSchema = new Schema ({
    role: { type: String, required: true},
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    token: { type: String, required: true},
    tokenCreatedAt: { type: Date, required: true}
});


const AdminModel = model<IAdmin>('Admin', AdminSchema);

export { IAdmin, AdminModel };