import UserServiceFactory from "@modules/user/domain/service/UserServiceFactory";
import CreateUserController from "./CreateUserController/CreateUserController";

class UserControllerFactory {
    constructor (private readonly _userServices: UserServiceFactory) {}

    public getCreateUser () {
        return new CreateUserController(this._userServices);
    }
}

export default UserControllerFactory