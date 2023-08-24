import { auth } from "@config/auth/AuthSecretKey";
import User from "@modules/user/domain/entity/User";
import { sign } from "jsonwebtoken";
import IAuthProvider from "./IAuthProvider";

class AuthenticateProvider implements IAuthProvider {
    public sing(user: User) {
            return sign({
                "name": user.name,
            }, auth.secretKey, {
                subject: user.id,
                expiresIn: auth.expiresIn
            });
    }
}

export default AuthenticateProvider