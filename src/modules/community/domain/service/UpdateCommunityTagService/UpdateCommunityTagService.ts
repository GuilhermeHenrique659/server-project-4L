import IService from "@common/service/IService";
import ICommunityRepository from "../../repository/ICommunityRepository";
import { UpdateCommunityTagServiceDTO } from "./UpdateCommunityTagServiceDTO";
import CommunityTag from "../../entity/CommunityTag";
import Tag from "@modules/tag/domain/entity/Tag";
import { inject, injectable } from "tsyringe";
import { Repository } from "@common/emun/InjectionsEmun";

@injectable()
class UpdateCommunityTagService implements IService {
    constructor(@inject(Repository.CommunityRepository) private readonly _communityRepository: ICommunityRepository) { }

    public async execute(data: UpdateCommunityTagServiceDTO): Promise<Tag[]> {
        const { community, tags } = data;

        const currentTags = await this._communityRepository.findCommunityTags(community.id);

        if (currentTags.length > 0) {
            for (const tag of currentTags) {
                if (!tags.includes(tag)) {
                    const communityTag = new CommunityTag(community, tag)
                    await this._communityRepository.removeCommunityTag(communityTag);
                }
            };
        }

        for (const tag of tags) {
            if (!currentTags.includes(tag)) {
                const communityTag = new CommunityTag(community, tag)
                await this._communityRepository.saveCommunityTag(communityTag);
            }
        }

        return tags;
    }
}

export default UpdateCommunityTagService;