import UserServiceFactory from "@modules/user/domain/service/UserServiceFactory";
import CreateUserController from "./CreateUserController/CreateUserController";
import TagServiceFactory from "@modules/tag/domain/service/TagServiceFactory";

class UserControllerFactory {
    constructor (private readonly _userServices: UserServiceFactory,
        private readonly _tagService: TagServiceFactory) {}

    public getCreateUser () {
        return new CreateUserController(this._userServices, this._tagService);
    }
}

export default UserControllerFactory