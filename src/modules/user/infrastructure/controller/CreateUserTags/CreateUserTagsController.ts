import IController from "@common/controller/IController";
import Tag from "@modules/tag/domain/entity/Tag";
import ICreateUserTagsDTO from "./CreateUserTagDTO";
import CreateInterestUserService from "@modules/user/domain/service/createInterestUser/CreateInterestUserService";
import CreateTagService from "@modules/tag/domain/service/CreateTagService/CreateTagService";
import FindTagService from "@modules/tag/domain/service/FindTagService/FindTagService";

import { ControllerInput } from "@common/types/ControllerIO";
import { injectable } from "tsyringe";

@injectable()
class CreateUserTagsController implements IController {
    constructor(
        private readonly _createInterestUserService: CreateInterestUserService,
        private readonly _createTagService: CreateTagService,
        private readonly _findTagService: FindTagService,
    ) { }

    public async handle(payload: ControllerInput<ICreateUserTagsDTO>): Promise<Tag[]> {
        const userId = payload.user?.id as string
        const { tags } = payload.data

        if (tags) {
            for (const tag of tags) {
                let userTag: Tag | undefined;
                if (tag.description) {
                    userTag = await this._createTagService.execute(tag);
                } else {
                    userTag = await this._findTagService.execute({ id: tag.id });
                }
                if (userTag)
                    await this._createInterestUserService.execute({
                        userId,
                        tag: userTag
                    });
            }
        }

        return tags
    }
}

export default CreateUserTagsController;