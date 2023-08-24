import User from "@modules/user/domain/entity/User";

export default interface IAuthProvider {
    sing(user: User): string
}