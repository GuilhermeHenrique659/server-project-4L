import IService from "@common/service/IService";
import ICommunityRepository from "../../repository/ICommunityRepository";
import { inject, injectable } from "tsyringe";
import { Repository } from "@common/emun/InjectionsEmun";

@injectable()
class GetCommunityFollowersService implements IService {
    constructor(@inject(Repository.CommunityRepository) private readonly _communityRepository: ICommunityRepository) { }

    public async execute(data: { communityId: string }): Promise<string[]> {
        return await this._communityRepository.findCommunityUsers(data.communityId);
    }
}

export default GetCommunityFollowersService;