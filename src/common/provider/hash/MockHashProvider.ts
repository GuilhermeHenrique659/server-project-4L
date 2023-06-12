import IHashProvider from "./IHashProvider";

class MockHashProvider implements IHashProvider {
    compareHash(password: string, hash: string): Promise<boolean> {
        return Promise.resolve(password === hash);
    }

    generateHash(password: string): Promise<string> {
        return Promise.resolve(password);
    }
}

export default MockHashProvider;