import { TokenGenerator } from "../../src/lib/TokenGenerator";
import { hash } from "bcrypt";

describe("TokenGeneratorTest", () => {

    it("should create random UUID", () => {
        let randomString = TokenGenerator.generate();
        expect(randomString).toEqual(randomString.toString());
    });

    it("should return a hash of a given string", () => {
        let randomString = TokenGenerator.generate();
        let hashResult = TokenGenerator.hashPassword(randomString);
        expect(hash(randomString, 10)).toStrictEqual(hashResult);
    })
});