import IService from "@common/service/IService";
import ICommunityRepository from "../../repository/ICommunityRepository";

class GetCommunityFollowersService implements IService {
    constructor( private readonly _communityRepository: ICommunityRepository) {}

    public async execute(data: { communityId: string}): Promise<string[]> {
        return await this._communityRepository.findCommunityUsers(data.communityId);
    }
}

export default GetCommunityFollowersService;