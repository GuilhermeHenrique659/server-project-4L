import IController from "@common/controller/IController";
import { ControllerInput, ControllerOutput } from "@common/types/ControllerIO";
import User from "../../../domain/entity/User";
import UserServiceFactory from "@modules/user/domain/service/UserServiceFactory";
import { CreateUserControllerDTO } from "./CreateUserControllerDTO";
import TagServiceFactory from "@modules/tag/domain/service/TagServiceFactory";

class CreateUserController implements IController {
    constructor (
        private _userServices: UserServiceFactory,
        private _tagServices: TagServiceFactory,
    ) {}

    public async handle(payload: ControllerInput<CreateUserControllerDTO>): Promise<ControllerOutput<User>> {
        const { tags, ...user } = payload       
        const createdUser = await this._userServices.getCreateUser().execute(user);

        if (tags) {
            for (const tag of tags) {
                if (tag.description) {
                    const createdTag = await this._tagServices.getCreateTag().execute(tag)
                    await this._userServices.getCreateInterestUser().execute({
                        user: createdUser,
                        tag: createdTag
                    });
                } else {
                    const findTag = await this._tagServices.getFindTag().execute({ id: tag.id})
                    await this._userServices.getCreateInterestUser().execute({
                        user: createdUser,
                        tag: findTag
                    });
                }
            }
        }

        return createdUser
    }
}

export default CreateUserController;