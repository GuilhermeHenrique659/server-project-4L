import CreateUserService from "./createUser/CreateUserService";
import IUserRepository from "../repository/IUserRepository";

class UserServiceFactory {
    constructor (private readonly _userRepository: IUserRepository) {}

    public getCreateUser() {
        return new CreateUserService(this._userRepository);
    }
}

export default UserServiceFactory