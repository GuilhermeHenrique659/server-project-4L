import IService from "@common/service/IService";
import Community from "@modules/community/domain/entity/Community";
import ICommunityRepository from "@modules/community/domain/repository/ICommunityRepository";

class GetFollowingCommunityService implements IService {
    constructor (private readonly _communityRepository: ICommunityRepository) {}

    public async execute(data: { userId: string}): Promise<Community[]> {
        return await this._communityRepository.getFollowingCommunity(data.userId);
    }
}

export default GetFollowingCommunityService;