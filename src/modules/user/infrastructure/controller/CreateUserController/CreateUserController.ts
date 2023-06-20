import IController from "@common/controller/IController";
import { ControllerInput, ControllerOutput } from "@common/types/ControllerIO";
import User from "../../../domain/entity/User";
import UserServiceFactory from "@modules/user/domain/service/UserServiceFactory";
import { CreateUserControllerDTO } from "./CreateUserControllerDTO";
import TagServiceFactory from "@modules/tag/domain/service/TagServiceFactory";
import Tag from "@modules/tag/domain/entity/Tag";

class CreateUserController implements IController {
    constructor (
        private _userServices: UserServiceFactory,
        private _tagServices: TagServiceFactory,
    ) {}

    public async handle(payload: ControllerInput<CreateUserControllerDTO>): Promise<ControllerOutput<User>> {
        const { tags, avatar, ...user } = payload       
        const createdUser = await this._userServices.getCreateUser().execute(user);

        if (tags) {
            for (const tag of tags) {
                let userTag: Tag | undefined; 
                if (tag.description) {
                    userTag = await this._tagServices.getCreateTag().execute(tag)

                } else {
                    userTag = await this._tagServices.getFindTag().execute({ id: tag.id})
                }
                if (userTag)
                    await this._userServices.getCreateInterestUser().execute({
                        user: createdUser,
                        tag: userTag
                    });
            }
        }
        if (avatar) {
           createdUser.avatar = await this._userServices.getCreateAtavat().execute({ user: createdUser, fileData: avatar.data, type: avatar.type});
        }

        return createdUser
    }
}

export default CreateUserController;