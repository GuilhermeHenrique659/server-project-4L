import IController from "@common/controller/IController";
import { ControllerInput } from "@common/types/ControllerIO";
import Tag from "@modules/tag/domain/entity/Tag";
import TagServiceFactory from "@modules/tag/domain/service/TagServiceFactory";
import UserServiceFactory from "@modules/user/domain/service/UserServiceFactory";
import ICreateUserTagsDTO from "./CreateUserTagDTO";


class CreateUserTagsController implements IController{
    constructor (
        private _userServices: UserServiceFactory,
        private _tagServices: TagServiceFactory,
    ) {}
    
    public async handle(payload: ControllerInput<ICreateUserTagsDTO>): Promise<Tag[]> {
        const userId = payload.user?.id as string
        const { tags } = payload.data

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
                        userId,
                        tag: userTag
                    });
            }
        }

        return tags
    }
}

export default CreateUserTagsController;