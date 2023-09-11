import IController from "@common/controller/IController";
import { ControllerInput } from "@common/types/ControllerIO";
import CreateInterestUserService from "@modules/user/domain/service/createInterestUser/CreateInterestUserService";
import UpdateAvatarService from "@modules/user/domain/service/updateAvatar/UpdateAvatarSevice";
import UpdateUserService from "@modules/user/domain/service/updateUser/UpdateUserService";
import { injectable } from "tsyringe";
import { UpdateUserControllerInputDTO } from "./UpdateUserControllerDTO";
import FindTagService from "@modules/tag/domain/service/FindTagService/FindTagService";
import CreateTagService from "@modules/tag/domain/service/CreateTagService/CreateTagService";
import Tag from "@modules/tag/domain/entity/Tag";
import UserPresenter from "../../presenter/UserPresenter";

@injectable()
class UpdateUserController implements IController {
    constructor(private readonly _updateUserService: UpdateUserService,
        private readonly _updateAvatarService: UpdateAvatarService,
        private readonly _createInterestUserService: CreateInterestUserService,
        private readonly _createTagService: CreateTagService,
        private readonly _findTagService: FindTagService,) { }

    public async handle(payload: ControllerInput<UpdateUserControllerInputDTO>) {
        const userId = payload.user?.id as string;
        const { avatar, tags, ...user } = payload.data;

        const userUpdated = await this._updateUserService.execute({
            id: userId,
            ...user
        });

        if (avatar) {
            userUpdated.avatar = await this._updateAvatarService.execute({
                userId,
                fileData: avatar.data,
                type: avatar.type
            });
        }

        if (tags) {
            userUpdated.tags = []
            for (const tag of tags) {
                let newTag: Tag | undefined;
                if (tag.description) {
                    newTag = await this._createTagService.execute(tag);
                } else {
                    newTag = await this._findTagService.execute({ id: tag.id });
                }
                if (newTag) {
                    const userTag = await this._createInterestUserService.execute({
                        userId,
                        tag: newTag
                    });
                    if (userTag) userUpdated.tags.push(userTag);
                }
            }
        }

        return UserPresenter.updateUser(userUpdated);
    }
}

export default UpdateUserController;