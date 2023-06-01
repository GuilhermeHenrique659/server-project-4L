import CreateUserService from "./createUser/CreateUserService";
import IUserRepository from "../repository/IUserRepository";
import CreateInterestUserService from "./createInterestUser/CreateInterestUserService";

class UserServiceFactory {
    constructor (private readonly _userRepository: IUserRepository) {}

    public getCreateUser() {
        return new CreateUserService(this._userRepository);
    }

    public getCreateInterestUser() {
        return new CreateInterestUserService(this._userRepository);
    }
}

export default UserServiceFactory