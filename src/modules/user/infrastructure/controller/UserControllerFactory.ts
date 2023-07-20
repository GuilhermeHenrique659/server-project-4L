import UserServiceFactory from "@modules/user/domain/service/UserServiceFactory";
import CreateUserController from "./CreateUserController/CreateUserController";
import TagServiceFactory from "@modules/tag/domain/service/TagServiceFactory";
import CreateUserSessionController from "./CreateUserSessionController.ts/CreateUserSessionController";
import CreateUserTagsController from "./CreateUserTags/CreateUserTagsController";
import UpdateUserAvatarController from "./CreateUserAvatar/UpdateUserAvatarController";

class UserControllerFactory {
    constructor (private readonly _userServices: UserServiceFactory,
        private readonly _tagService: TagServiceFactory) {}

    public getCreateSession() {
        return new CreateUserSessionController(this._userServices);
    }

    public getCreateUserTags() {
        return new CreateUserTagsController(this._userServices, this._tagService);
    }

    public getUpdateUserAvatar() {
        return new UpdateUserAvatarController(this._userServices);
    }

    public getCreateUser () {
        return new CreateUserController(this._userServices);
    }
}

export default UserControllerFactory