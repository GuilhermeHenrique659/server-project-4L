import { compare, hash } from "bcrypt";
import bcrypt from "bcrypt";
import IHashProvider from "./IHashProvider";

class HashProvider implements IHashProvider {
    public async compareHash(password: string, hash: string): Promise<boolean> {
        return await compare(password, hash);
    }

    public async generateHash(password: string): Promise<string> {
        const stepHash = 8;
        return await hash(password, stepHash);
    }
}

export default HashProvider;