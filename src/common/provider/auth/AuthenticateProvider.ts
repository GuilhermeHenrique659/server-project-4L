import { auth } from "@config/auth/AuthSecretKey";
import User from "@modules/user/domain/entity/User";
import { sign } from "jsonwebtoken";

class AuthenticateProvider {
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