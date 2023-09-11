import AppError from "@common/errors/AppError";
import { auth } from "@config/auth/AuthSecretKey";
import { verify } from "jsonwebtoken";

class AuthenticateMiddleware {
    static run(tokenRaw: string) {
        const [, token] = tokenRaw.split(" ");

        try {
            const decodedToken = verify(token, auth.secretKey);

            const { sub } = decodedToken;

            return sub as string;
        } catch {
            throw new AppError("Token JWT is not valid")
        }
    }
}

export default AuthenticateMiddleware;