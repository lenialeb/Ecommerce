import UserRepository from "../repository/UserRepository.js";

export default class AuthProvider {

    private static UserRepository: UserRepository | null = null;

    public static provideUserRepository() {
        if (this.UserRepository === null) {
            this.UserRepository = new UserRepository();
        }
        return this.UserRepository;
    }
}