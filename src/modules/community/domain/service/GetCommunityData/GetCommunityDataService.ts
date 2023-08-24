import IService from "@common/service/IService";
import ICommunityRepository from "../../repository/ICommunityRepository";
import { inject, injectable } from "tsyringe";
import { Repository } from "@common/emun/InjectionsEmun";

@injectable()
class GetCommunityDataService implements IService {
    constructor(@inject(Repository.CommunityRepository) private readonly _communityRepository: ICommunityRepository) { }

    public async execute(data: { communityId: string, userId: string }): Promise<any> {
        return await this._communityRepository.getCommunityData(data.communityId, data.userId)
    }
}

export default GetCommunityDataService;