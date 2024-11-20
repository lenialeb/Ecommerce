import { hash } from "bcrypt";
import { randomUUID } from "crypto";

export class TokenGenerator{

    public static generate() {
        return randomUUID().toString();
    }

    public static hashPassword(password: string) {
        const saltrounds = 10;
        return hash(password, saltrounds);
    }
}