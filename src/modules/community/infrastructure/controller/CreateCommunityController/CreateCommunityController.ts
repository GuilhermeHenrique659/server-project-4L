import IController from "@common/controller/IController";
import { ControllerInput, ControllerOutput } from "@common/types/ControllerIO";
import { CreateCommunityRequestDTO, CreateCommunityResponseDTO } from "./CreateCommunityControllerDTO";
import CommunityPresenter from "../../presenter/CommunityPresenter";
import CreateCommunityService from "@modules/community/domain/service/CreateCommunityService/CreateCommunityService";
import UpdateCommunityAvatarService from "@modules/community/domain/service/UpdateCommunityAvatarService/UpdateCommunityAvatarService";
import UpdateCommunityCoverService from "@modules/community/domain/service/UpdateCommunityCoverService/UpdateCommunityCoverService";
import CreateTagService from "@modules/tag/domain/service/CreateTagService/CreateTagService";
import FindTagService from "@modules/tag/domain/service/FindTagService/FindTagService";
import UpdateCommunityTagService from "@modules/community/domain/service/UpdateCommunityTagService/UpdateCommunityTagService";
import { injectable } from "tsyringe";

@injectable()
class CreateCommunityController implements IController {
    constructor(private readonly _createCommunityService: CreateCommunityService,
        private readonly _updateCommunityAvatarService: UpdateCommunityAvatarService,
        private readonly _updateCommunityCoverService: UpdateCommunityCoverService,
        private readonly _createTagService: CreateTagService,
        private readonly _findTagService: FindTagService,
        private readonly _updateCommunityTagService: UpdateCommunityTagService) { }

    public async handle(payload: ControllerInput<CreateCommunityRequestDTO>): Promise<ControllerOutput<CreateCommunityResponseDTO>> {
        const { data: { name, description, tags, cover, avatar }, user } = payload;
        const userId = user?.id as string;

        const community = await this._createCommunityService.execute({ name, description, userId });

        if (avatar) {
            community.avatar = await this._updateCommunityAvatarService.execute({ community, fileData: avatar.data, type: avatar.type });
        }

        if (cover) {
            community.cover = await this._updateCommunityCoverService.execute({ community, fileData: cover.data, type: cover.type });
        }

        if (tags) {
            const communityTags = []
            for (const tag of tags) {
                if (tag.description) {
                    communityTags.push(await this._createTagService.execute(tag));
                } else {
                    const tagExists = await this._findTagService.execute(tag);
                    if (tagExists)
                        communityTags.push(tagExists);
                }
            }
            community.tags = await this._updateCommunityTagService.execute({ community, tags: communityTags });
        }

        return CommunityPresenter.createCommunity(community)
    }
}

export default CreateCommunityController;