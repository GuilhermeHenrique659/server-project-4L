import IController from "@common/controller/IController";
import { ControllerInput, ControllerOutput } from "@common/types/ControllerIO";
import { CreateCommunityRequestDTO, CreateCommunityResponseDTO } from "./CreateCommunityControllerDTO";
import CommunityServiceFactory from "@modules/community/domain/service/CommunityServiceFactory";
import CommunityPresenter from "../../presenter/CommunityPresenter";
import TagServiceFactory from "@modules/tag/domain/service/TagServiceFactory";

class CreateCommunityController implements IController {
    constructor(private readonly communityServiceFactory: CommunityServiceFactory,
        private readonly tagServiceFactory: TagServiceFactory){}

    public async handle(payload: ControllerInput<CreateCommunityRequestDTO>): Promise<ControllerOutput<CreateCommunityResponseDTO>> {
        const { data: { name, description, tags, cover, avatar }, user } = payload;
        const userId = user?.id as string;        

        const community = await this.communityServiceFactory.getCreateCommunity().execute({ name, description, userId });
        
        if (avatar){
            community.avatar = await this.communityServiceFactory.getUpdateAvatar().execute({ community, fileData: avatar.data, type: avatar.type });
        }

        if (cover) {
            community.cover = await this.communityServiceFactory.getUpdateCover().execute({ community, fileData: cover.data, type: cover.type });
        }

        if (tags){
            const communityTags = []
            for (const tag of tags) {
                if (tag.description) {
                    communityTags.push(await this.tagServiceFactory.getCreateTag().execute(tag));
                } else {
                    const tagExists = await this.tagServiceFactory.getFindTag().execute(tag);
                    if (tagExists)
                        communityTags.push(tagExists);
                }
            }
            community.tags = await this.communityServiceFactory.getUpdateTag().execute({ community, tags: communityTags });
        }
        
        return CommunityPresenter.createCommunity(community)
    }
}

export default CreateCommunityController;