import UserRepository from "../repository/UserRepository.js";
import { IUser, UserModel } from "../model/User.js";
export default class AuthProvider {

    private static UserRepository: UserRepository | null = null;
    private static UserModel: IUser | null = null;

    public static provideUserRepository() {
        if (this.UserRepository === null) {
            this.UserRepository = new UserRepository();
        }
        return this.UserRepository;
    }

    public static provideUserModel() {
        if (this.UserModel === null) {
            this.UserModel = new UserModel();
        }
    }
}